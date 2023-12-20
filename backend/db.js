const mongoose = require('mongoose');

const connectDB = () => {
  const url =
    'mongodb+srv://hberidev:542AAxsHSbQszOHM@cluster0.7bmb9je.mongodb.net/?retryWrites=true&w=majority';
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', _ => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', err => {
    console.error(`connection error: ${err}`);
  });
  return;
};

module.exports = connectDB;
