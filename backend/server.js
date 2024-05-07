require('dotenv').config();
const express = require('express');
const app = express();
const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./db');
const Item = require('./models/item');
const User = require('./models/user');
const WastedItem = require('./models/wasteItem');
const ConsumedItem = require('./models/consumedItem');
const FavoritedRecipe = require('./models/favoritedRecipe');
const CustomItem = require('./models/customItem');

const OpenAI = require('openai');

const storage = new Storage();

const bucketName = 'thephotobucket';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
});

function calculateUserLevel(xp) {
  if (xp < 1000) return 1;
  if (xp >= 1000 && xp < 2000) return 2;
  if (xp >= 2000 && xp < 3000) return 3;
  if (xp >= 3000) return 4;
  return 1;
}

function updateUserLevelAndCheckChange(user) {
  const oldLevel = user.level;
  const newLevel = calculateUserLevel(user.xp);
  const levelChanged = oldLevel !== newLevel;
  user.level = newLevel;
  return {levelChanged, newLevel, xp: user.xp};
}

const imagePrompt =
  'Please analyze the attached image and identify any grocery items that are clearly visible. Return the results as a JSON array of the common grocery item names. Each item should be in its plural form. The format should be a simple list: ["Item1", "Item2", "Item3", ...]. Do not include any labels or keys in the array. If an item in the image is not clearly identifiable or distinguishable, please omit it from the list. For example, if the image clearly shows apples, bananas, and a loaf of bread, the result should be formatted as ["Apples", "Bananas", "Bread"].';

const receiptPrompt =
  'Please analyze the receipt in the image and identify any grocery items that are clearly visible. Return the results as a JSON array of the common grocery item names. Please list the name as its most common ingredient name, avoiding descriptors such as organic, or reduced fat. Each item should be in its plural form, if grammatically correct. The format should be a simple list: ["Item1", "Item2", "Item3", ...]. Do not include any labels or keys in the array. If an item in the receipt is not a common grocery item that can be consumed, please omit it from the list. For example, if the receipt lists apples, bananas, and laundry detergent, the result should be formatted as ["Apples", "Bananas"].';

const upload = multer({storage: multer.memoryStorage()});

app.use('/public', express.static('../assets'));
app.use(cors());
app.use(express.json());

connectDB();

async function veggiesTest(imageUrl, mode) {
  try {
    const promptText = mode === 'groceries' ? imagePrompt : receiptPrompt;
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
                url: imageUrl,
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

//fetch users top items logged
app.get('/users/topItems/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const consumedItems = await ConsumedItem.find({user: userEmail});
    const wastedItems = await WastedItem.find({user: userEmail});

    let itemFrequencies = {};

    consumedItems.forEach(item => {
      if (itemFrequencies[item.name]) {
        itemFrequencies[item.name] += item.frequency;
      } else {
        itemFrequencies[item.name] = item.frequency;
      }
    });

    wastedItems.forEach(item => {
      if (itemFrequencies[item.name]) {
        itemFrequencies[item.name] += item.frequency;
      } else {
        itemFrequencies[item.name] = item.frequency;
      }
    });

    // Convert the itemFrequencies object into an array and sort it by frequency
    let sortedItems = Object.keys(itemFrequencies)
      .map(name => ({
        name,
        frequency: itemFrequencies[name],
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 30);

    res.json(sortedItems);
  } catch (error) {
    console.error('Error fetching top items:', error);
    res.status(500).send('Internal server error');
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

// Endpoint to get storage tip for a custom item
app.get('/customItems/storageTip', async (req, res) => {
  const itemName = req.query.itemName;

  if (!itemName) {
    return res.status(400).send('Item name and user email are required');
  }

  try {
    const customItem = await CustomItem.findOne({
      itemName: itemName.toLowerCase(),
    });

    if (customItem) {
      res.json({storageTip: customItem.storageTip});
    } else {
      res.status(404).send('No custom item found');
    }
  } catch (error) {
    console.error('Failed to fetch custom item:', error);
    res.status(500).send('Error fetching custom item');
  }
});

// Endpoint to add a custom item
app.post('/customItems', async (req, res) => {
  const {itemName, storageTip, userEmail} = req.body;
  try {
    const newCustomItem = new CustomItem({
      itemName: itemName,
      storageTip: storageTip,
      userEmail: userEmail,
      dateTime: new Date(), // capturing the current dateTime
    });
    await newCustomItem.save();
    res.status(201).json(newCustomItem);
  } catch (error) {
    console.error('Failed to save custom item:', error);
    res.status(500).send('Error saving custom item');
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

// Open AI analyze image
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
      user.xp += 3 * itemsData.length;
      // Check for level change and update the user accordingly
      const {levelChanged, newLevel, xp} = updateUserLevelAndCheckChange(user);
      await user.save();
      return res.json({savedItems, levelChanged, newLevel, xp}); // Note the return statement here
    }

    return res.json(savedItems); // Also added return here for clarity
  } catch (error) {
    return res.status(400).send(error); // It's good practice to return after sending a response in catch block as well
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
      {new: true},
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
      {exp_date: new Date(req.body.exp_date)},
      {new: true},
    );
    if (updatedItem) {
      // Find the user associated with the item and increase their XP
      const user = await User.findOne({email: updatedItem.user});
      if (user) {
        user.xp += 2; // Gain 2 XP for updating expiration date
        // Check for level change and update the user accordingly
        const {levelChanged, newLevel, xp} =
          updateUserLevelAndCheckChange(user);
        await user.save();
        // Include level change information in the response
        res.json({item: updatedItem, levelChanged, newLevel, xp});
      } else {
        res.status(404).send('User not found');
      }
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete all items for a specific user
app.delete('/items/deleteAll/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  if (!userEmail) {
    return res.status(400).send('User email is required');
  }

  try {
    const user = await User.findOne({email: userEmail});
    if (!user) {
      return res.status(404).send('User not found');
    }

    await Item.deleteMany({user: userEmail});
    res.status(204).send(); // 204 No Content, indicates successful deletion without returning any content
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send(error.message);
  }
});

// Delete one item by id
app.delete('/items/:id', async (req, res) => {
  try {
    const deletionMethod = req.query.method;
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
        existingItem.frequency += 1;
        await existingItem.save();
      } else {
        await ItemModel.create({
          name: deletedItem.name,
          user: deletedItem.user,
          frequency: 1,
        });
      }
    }

    await Item.findByIdAndDelete(req.params.id);

    const user = await User.findOne({email: deletedItem.user});
    if (user) {
      user.itemsDeleted.total += 1;
      let xpGain = 0; // Initialize XP gain variable

      if (deletionMethod === 'undo') {
        user.itemsDeleted.byUndo += 1;
      }
      if (deletionMethod === 'consume') {
        user.itemsDeleted.byConsume += 1;
        xpGain += 2; // Gain 2 XP for consume method
      }
      if (deletionMethod === 'waste') {
        user.itemsDeleted.byWaste += 1;
        xpGain += 1; // Gain 1 XP for waste method
      }

      user.xp += xpGain;
      // Check for level change and update the user accordingly
      const {levelChanged, newLevel, xp} = updateUserLevelAndCheckChange(user);
      await user.save();

      // If the request expects a JSON response
      res.json({message: 'Item deleted', levelChanged, newLevel, xp});
    } else {
      res.status(404).send('User not found');
    }
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
