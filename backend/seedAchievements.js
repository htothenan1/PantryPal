// File: seedAchievements.js

const mongoose = require('mongoose');
const Achievement = require('./models/Achievement'); // Adjust the path as necessary

async function seedAchievements() {
  mongoose.connect(
    'mongodb+srv://hberidev:542AAxsHSbQszOHM@cluster0.7bmb9je.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  const achievementsData = [
    {
      name: 'Level 1 Strawberry',
      level: 1,
      criteria: {itemName: 'Strawberries', consumeCount: 5},
    },
    {
      name: 'Level 2 Strawberry',
      level: 2,
      criteria: {itemName: 'Strawberries', consumeCount: 20},
    },
    // Add more achievements as needed
  ];

  try {
    for (const achievementData of achievementsData) {
      // Check if the achievement already exists to avoid duplicates
      const existingAchievement = await Achievement.findOne({
        name: achievementData.name,
        level: achievementData.level,
      });
      if (!existingAchievement) {
        const achievement = new Achievement(achievementData);
        await achievement.save();
      }
    }
    console.log('Achievements seeded successfully.');
  } catch (error) {
    console.error('Error seeding achievements:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

module.exports = seedAchievements;
