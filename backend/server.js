const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./db');
const Item = require('./models/item');

app.use(cors());
app.use(express.json());

connectDB();

//ROUTES

// Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(400).send(error);
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

//create multiple items
app.post('/items', async (req, res) => {
  try {
    const itemsData = req.body.items;

    const savedItems = [];
    for (const itemData of itemsData) {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + itemData.exp_int);

      const newItem = new Item({
        name: itemData.name,
        storage_tip: itemData.storage_tip,
        exp_date: expDate,
      });
      const savedItem = await newItem.save();
      savedItems.push(savedItem);
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
  console.log(`Delete request for itemId: ${req.params.id}`);
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      res.status(404).send('Item not found');
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(400).send('Bad request: ' + error.message);
  }
});

// const confirmDeleteAll = () => {
//   Alert.alert(
//     'Confirm Deletion',
//     'Are you sure you want to delete all items?',
//     [
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Deletion cancelled'),
//         style: 'cancel',
//       },
//       {text: 'OK', onPress: () => deleteAllItems()},
//     ],
//     {cancelable: false},
//   );
// };

// const deleteAllItems = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/items/deleteAll', {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     console.log('Items deleted successfully');
//     fetchItems();
//   } catch (error) {
//     console.error('Error deleting items:', error.message);
//   }
// };

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
