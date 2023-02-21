const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// Connect to the database
mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Create instances of the models
const user1 = new User({
  username: 'john_doe',
  email: 'john_doe@example.com'
});

const user2 = new User({
  username: 'jane_doe',
  email: 'jane_doe@example.com'
});

const thought1 = new Thought({
  thoughtText: 'Hello, world!',
  username: user1.username,
  userId: user1._id
});

const thought2 = new Thought({
  thoughtText: 'How are you doing today?',
  username: user2.username,
  userId: user2._id
});

// const reaction1 = new Reaction({
//   reactionBody: '👍',
//   username: user1.username,
//   userId: user1._id,
//   thoughtId: thought2._id
// });

// const reaction2 = new Reaction({
//   reactionBody: '❤️',
//   username: user2.username,
//   userId: user2._id,
//   thoughtId: thought1._id
// });

// Save the instances to the database
async function seedDatabase() {
  await user1.save();
  await user2.save();
  await thought1.save();
  await thought2.save();
  // await reaction1.save();
  // await reaction2.save();
  console.log('Dummy data seeded successfully!');
  mongoose.connection.close();
}

seedDatabase();
