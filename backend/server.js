require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./db');
const Item = require('./models/item');
const User = require('./models/user');
const WastedItem = require('./models/wasteItem');
const ConsumedItem = require('./models/consumedItem');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,
  // dangerouslyAllowBrowser: true,
});

app.use('/public', express.static('../assets'));
app.use(cors());
app.use(express.json());

connectDB();

//ROUTES

// Get all items
app.get('/items', async (req, res) => {
  try {
    const userEmail = req.query.email; // Get the user email from the query parameter
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

app.post('/generateStorageTip', async (req, res) => {
  const {item} = req.body; // The item for which you want storage tips

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
    const {email, firstName} = req.body; // Destructure firstName from the request body
    const newUser = new User({
      email: email,
      firstName: firstName, // Save firstName in the new user document
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//create multiple items
app.post('/items', async (req, res) => {
  try {
    const {items: itemsData, userEmail} = req.body; // Destructure the userEmail from the body

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
      await user.save();
    }

    res.json(savedItems);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an item
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

    // Handling for consume and waste methods
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
