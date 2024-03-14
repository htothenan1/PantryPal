require('dotenv').config();
const express = require('express');
const app = express();
const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const connectDB = require('./db');
const Item = require('./models/item');
const User = require('./models/user');
const WastedItem = require('./models/wasteItem');
const ConsumedItem = require('./models/consumedItem');
const FavoritedRecipe = require('./models/favoritedRecipe');

const OpenAI = require('openai');

const storage = new Storage();

const bucketName = 'thephotobucket';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
});

const imagePrompt =
  'Please analyze the attached image and identify any grocery items that are clearly visible. Return the results as a JSON array of the item names. Each item should be in its plural form. The format should be a simple list: ["Item1", "Item2", "Item3", ...]. Do not include any labels or keys in the array. If an item in the image is not clearly identifiable or distinguishable, please omit it from the list. For example, if the image clearly shows apples, bananas, and a loaf of bread, the result should be formatted as ["Apples", "Bananas", "Bread"].';

const receiptPrompt =
  'Please analyze the receipt in the image and identify any grocery items that are clearly visible. Return the results as a JSON array of the item names. Each item should be in its plural form. The format should be a simple list: ["Item1", "Item2", "Item3", ...]. Don not include any labels or keys in the array. If an item in the receipt is not a common grocery item that can be consumed, please omit it from the list. For example, if the receipt lists apples, bananas, and laundry detergent, the result should be formatted as ["Apples", "Bananas"].';

// const upload = multer({dest: 'uploads/'});
const upload = multer({storage: multer.memoryStorage()});

app.use('/public', express.static('../assets'));
app.use(cors());
app.use(express.json());

connectDB();

// function convertToBase64(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, {encoding: 'base64'}, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(`data:image/jpeg;base64,${data}`);
//       }
//     });
//   });
// }

// async function veggiesTest(base64Image, mode) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4-vision-preview',
//       messages: [
//         {
//           role: 'user',
//           content: [
//             {
//               type: 'text',
//               text: `${mode === 'groceries' ? imagePrompt : receiptPrompt}`,
//             },
//             {
//               type: 'image_url',
//               image_url: base64Image,
//             },
//           ],
//         },
//       ],
//       max_tokens: 2000,
//     });

//     return response.choices[0];
//   } catch (error) {
//     console.error(error);
//   }
// }

async function veggiesTest(imageUrl, mode) {
  try {
    const promptText = mode === 'groceries' ? imagePrompt : receiptPrompt; // Use the appropriate prompt based on the mode
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {type: 'text', text: promptText},
            {
              type: 'image_url',
              image_url: {
                url: imageUrl, // Ensure this matches the documentation's structure
              },
            },
          ],
        },
      ],
    });
    return response.choices[0];
  } catch (error) {
    console.error(error);
  }
}

//ROUTES

// Get all items
app.get('/items', async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).send('Email parameter is required');
    }

    const items = await Item.find({user: userEmail});
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch user data by email
app.get('/users/data', async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).send('Email query parameter is required');
    }

    const user = await User.findOne({email: userEmail});
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get wasted and consumed items for a user
app.get('/items/useremail/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const user = await User.findOne({email: userEmail});
    if (!user) {
      return res.status(404).send('User not found');
    }

    const wastedItems = await WastedItem.find({user: userEmail}).sort({
      frequency: -1,
      name: 1,
    });
    const consumedItems = await ConsumedItem.find({user: userEmail}).sort({
      frequency: -1,
      name: 1,
    });

    res.json({wastedItems, consumedItems});
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// Get a single item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.json(item);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).send('Invalid ID format');
    }
    res.status(500).send(error);
  }
});

// Endpoint to check if a recipe is favorited by a user
app.get('/favorites/isFavorited', async (req, res) => {
  try {
    const {recipeId, user} = req.query;
    const favoritedRecipe = await FavoritedRecipe.findOne({recipeId, user});
    res.status(200).json({isFavorited: !!favoritedRecipe});
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// Endpoint to get all favorited recipes for a specific user
app.get('/favorites/user/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const favoritedRecipes = await FavoritedRecipe.find({user: userEmail});

    res.status(200).json(favoritedRecipes);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// Endpoint to toggle a recipe's favorite status
app.post('/favorites/toggle', async (req, res) => {
  try {
    const {recipeId, recipeName, user} = req.body;

    const existingFavorite = await FavoritedRecipe.findOne({recipeId, user});
    if (existingFavorite) {
      await FavoritedRecipe.deleteOne({_id: existingFavorite._id});
      res.status(200).json({message: 'Recipe removed from favorites'});
    } else {
      const newFavorite = new FavoritedRecipe({recipeId, recipeName, user});
      await newFavorite.save();
      res.status(201).json({message: 'Recipe added to favorites'});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Analyze image with OpenAI and return list of grocery items
// app.post('/analyzeImage', upload.single('image'), async (req, res) => {
//   try {
//     const imgFile = req.file.path;
//     const base64Image = await convertToBase64(imgFile);
//     const mode = req.body.mode;
//     const response = await veggiesTest(base64Image, mode);
//     console.log(response);
//     const itemsArray = JSON.parse(response.message.content);
//     res.json(itemsArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error processing image');
//   }
// });

app.post('/analyzeImage', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', err => res.status(500).send(err.toString()));

  blobStream.on('finish', async () => {
    // Construct the public URL or a signed URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;

    try {
      const mode = req.body.mode;
      const response = await veggiesTest(publicUrl, mode);
      console.log(response);
      const itemsArray = JSON.parse(response.message.content);
      res.json(itemsArray);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing image');
    }
  });

  blobStream.end(req.file.buffer);
});

// Return OpenAI storage tips
app.post('/generateStorageTip', async (req, res) => {
  const {item} = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Best storage tips for ${item}, limit response to two sentences. Make sure you are interpreting the item as a common grocery item, if possible.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const tip = completion.choices[0].message.content;
    res.json({storageTip: tip});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating storage tip');
  }
});

// create a new user
app.post('/users', async (req, res) => {
  try {
    const {email, firstName} = req.body;
    const newUser = new User({
      email: email,
      firstName: firstName,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Create multiple items
app.post('/items', async (req, res) => {
  try {
    const {items: itemsData, userEmail} = req.body;

    const savedItems = [];
    for (const itemData of itemsData) {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + itemData.exp_int);

      const newItem = new Item({
        name: itemData.name,
        storage_tip: itemData.storage_tip,
        exp_date: expDate,
        user: itemData.user,
      });
      const savedItem = await newItem.save();
      savedItems.push(savedItem);
    }

    const user = await User.findOne({email: userEmail});
    if (user) {
      user.itemsCreated += itemsData.length;
      user.xp += 10 * itemsData.length; // Increment the user's XP by 10 for each created item
      await user.save();
    }

    res.json(savedItems);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to update user's iconName
app.put('/users/icon', async (req, res) => {
  const {email, iconName} = req.body;

  if (!email || !iconName) {
    return res.status(400).send('Email and iconName are required');
  }

  try {
    const user = await User.findOneAndUpdate(
      {email: email},
      {iconName: iconName},
      {new: true}, // Return the updated document
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user iconName:', error);
    res.status(500).send('Internal server error');
  }
});

//Update an item's expiration date
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        exp_date: new Date(req.body.exp_date),
      },
      {new: true},
    );
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete all items
app.delete('/items/deleteAll', async (req, res) => {
  try {
    await Item.deleteMany({});
    res.status(204).send();
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send(error.message);
  }
});

// Delete one item by id
app.delete('/items/:id', async (req, res) => {
  try {
    const deletionMethod = req.query.method; // Expecting 'undo', 'consume', or 'waste'
    const deletedItem = await Item.findById(req.params.id);
    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }

    if (deletionMethod === 'consume' || deletionMethod === 'waste') {
      const ItemModel =
        deletionMethod === 'consume' ? ConsumedItem : WastedItem;
      const existingItem = await ItemModel.findOne({
        name: deletedItem.name,
        user: deletedItem.user,
      });

      if (existingItem) {
        existingItem.frequency = (existingItem.frequency || 0) + 1;
        await existingItem.save();
      } else {
        await ItemModel.create({
          name: deletedItem.name,
          user: deletedItem.user,
          frequency: 1,
        });
      }
    }

    // Now delete the item
    await Item.findByIdAndDelete(req.params.id);

    // Increment the user's deletion counters
    const user = await User.findOne({email: deletedItem.user});
    if (user) {
      user.itemsDeleted.total += 1;
      if (deletionMethod === 'undo') {
        user.itemsDeleted.byUndo += 1;
      }
      if (deletionMethod === 'consume') {
        user.itemsDeleted.byConsume += 1;
      }
      if (deletionMethod === 'waste') {
        user.itemsDeleted.byWaste += 1;
      }
      await user.save();
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send('Bad request: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
