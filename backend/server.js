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
const PantryItem = require('./models/pantryItem');
const ImportedRecipe = require('./models/importedRecipe');

const cheerio = require('cheerio');
const axios = require('axios');
const tinyduration = require('tinyduration');
const OpenAI = require('openai');
const storage = new Storage();
const bucketName = 'thephotobucket';
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
});

const calculateUserLevel = xp => {
  if (xp < 1000) {
    return 1;
  }
  if (xp >= 1000 && xp < 2000) {
    return 2;
  }
  if (xp >= 2000 && xp < 3000) {
    return 3;
  }
  if (xp >= 3000) {
    return 4;
  }
  return 1;
};

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

// Endpoint to get all imported recipes for a specific user
app.get('/importedRecipes', async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).send('Email parameter is required');
    }

    const importedRecipes = await ImportedRecipe.find({user: userEmail});

    res.status(200).json(importedRecipes);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// Fetch all pantry items for a user
app.get('/pantryItems', async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).send('Email parameter is required');
    }

    const items = await PantryItem.find({user: userEmail});
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

app.post('/saveRecipe', async (req, res) => {
  const {recipe, userEmail} = req.body;

  console.log('Request body:', req.body); // Log the request body

  try {
    const newRecipe = new ImportedRecipe({...recipe, user: userEmail});
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving recipe',
      error: error.message,
    });
  }
});

// Save pantry items for a user
app.post('/pantryItems', async (req, res) => {
  try {
    const {items, userEmail} = req.body;
    await PantryItem.deleteMany({user: userEmail});
    const pantryItems = items.map(item => ({itemName: item, user: userEmail}));
    await PantryItem.insertMany(pantryItems);

    res.status(200).send('Pantry items updated successfully');
  } catch (error) {
    res.status(500).send(error);
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
      dateTime: new Date(),
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

async function findLDJSON(url) {
  let req = await axios.get(url);
  let html = req.data;
  let $ = cheerio.load(html);
  let ldjson = $("script[type='application/ld+json']");
  if (ldjson.length === 0) return;
  let content = JSON.parse(ldjson[0].children[0].data);
  if (Array.isArray(content)) return content[0];
  else {
    if (content['@graph'] && Array.isArray(content['@graph'])) {
      for (let t of content['@graph']) {
        if (t['@type'] === 'Recipe') return t;
      }
    }
  }
  return;
}

function findRecipe(ldjson) {
  if (ldjson['@type'].indexOf('Recipe') === -1) return;
  let result = {};
  result.name = ldjson['name'];
  result.description = ldjson['description'];
  result.totalTime = durationToStr(ldjson['totalTime']);
  result.ingredients = ldjson['recipeIngredient'];
  result.instructions = parseInstructions(ldjson['recipeInstructions']);
  result.yield = ldjson['recipeYield'][0];
  return result;
}

function parseInstructions(instructions) {
  let result = [];
  for (let instruction of instructions) {
    if (typeof instruction === 'string') result.push(instruction);
    else {
      if (instruction['@type'] === 'HowToStep') result.push(instruction.text);
    }
  }
  return result;
}

function durationToStr(d) {
  if (!d) return '';
  let parsed = tinyduration.parse(d);
  let result = [];
  if (parsed.hours) {
    result.push(`${parsed.hours} hours`);
  }
  if (parsed.minutes) {
    result.push(`${parsed.minutes} minutes`);
  }
  if (parsed.seconds) {
    result.push(`${parsed.seconds} seconds`);
  }
  let formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });
  return formatter.format(result);
}

app.post('/parseRecipe', async (req, res) => {
  const {url} = req.body;
  try {
    let ldjson = await findLDJSON(url);
    if (!ldjson) {
      return res
        .status(400)
        .json({success: false, message: 'LD+JSON not found.'});
    }
    let recipe = findRecipe(ldjson);
    if (!recipe) {
      return res
        .status(400)
        .json({success: false, message: 'Recipe not found.'});
    }
    res.json({success: true, recipe});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred.',
      error: error.message,
    });
  }
});

// Return OpenAI storage tips
app.post('/generateStorageTip', async (req, res) => {
  const {item} = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Best storage tips for ${item}, limit response to two sentences. Make sure you are interpreting the item as a common grocery item, if possible.`,
        },
      ],
    });

    const tip = completion.choices[0].message.content;
    res.json({storageTip: tip});
  } catch (error) {
    console.error('Error generating storage tip:', error);
    res.status(500).send('Error generating storage tip');
  }
});

// Return OpenAI health facts
app.post('/generateHealthFacts', async (req, res) => {
  const {item} = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Best health facts for ${item}. Limit response to two sentences. Make sure you are interpreting the item as a common grocery item, if possible.`,
        },
      ],
    });

    const fact = completion.choices[0].message.content;
    res.json({healthFact: fact});
  } catch (error) {
    console.error('Error generating health facts:', error);
    res.status(500).send('Error generating health facts');
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
        whyEat: itemData.whyEat,
        exp_date: expDate,
        user: itemData.user,
        dateTime: new Date(),
      });
      const savedItem = await newItem.save();
      savedItems.push(savedItem);
    }

    const user = await User.findOne({email: userEmail});
    if (user) {
      user.itemsCreated += itemsData.length;
      user.xp += 3 * itemsData.length;
      const {levelChanged, newLevel, xp} = updateUserLevelAndCheckChange(user);
      await user.save();
      return res.json({savedItems, levelChanged, newLevel, xp});
    }

    return res.json(savedItems);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Update user's max score
app.put('/users/maxScore', async (req, res) => {
  const {email, maxScore} = req.body;

  if (!email || maxScore === undefined) {
    return res.status(400).send('Email and maxScore are required');
  }

  try {
    const user = await User.findOneAndUpdate(
      {email: email},
      {maxScore: maxScore},
      {new: true},
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating max score:', error);
    res.status(500).send('Internal server error');
  }
});

app.put('/users/preferences', async (req, res) => {
  const {email, omitMeats, omitSeafoods, omitDairy} = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const user = await User.findOneAndUpdate(
      {email: email},
      {omitMeats: omitMeats, omitSeafoods: omitSeafoods, omitDairy: omitDairy},
      {new: true},
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).send('Internal server error');
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
        user.xp += 2;
        // Check for level change and update the user accordingly
        const {levelChanged, newLevel, xp} =
          updateUserLevelAndCheckChange(user);
        await user.save();
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
    res.status(204).send();
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
