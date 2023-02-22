const mongoose = require('mongoose');
const User = require('../../models/User');
const Thought = require('../../models/Thought');
const connection = require('../../config/connection');
const userData = [
  {
    "username": "maxwell",
    "email": "maxwell@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "patra",
    "email": "patra@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "tim",
    "email": "tim@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "idris",
    "email": "idris@gmail.com",
    "thoughts": [],
    "friends": []
  }
];
const thoughtData = [
  {
    thoughtText: "This is my first thought!",
    username: "maxwell",
    reactions: [
      {
        reactionBody: "Wow, great thought! ❤️",
        username: "patra",
      },
      {
        reactionBody: "I disagree...",
        username: "tim",
      },
    ],
  },
  {
    thoughtText: "I'm having a great day!",
    username: "patra",
    reactions: [
      {
        reactionBody: "That's awesome! 👍 ",
        username: "maxwell",
      },
    ],
  },
];
// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.collection.insertMany(userData)
console.log(userData);
  await Thought.collection.insertMany(thoughtData)
console.log(thoughtData);

  console.log('Data seeded successfully!');

process.exit(0)})





// // Save the instances to the database
// async function seedDatabase() {
//   try {
//     const newUsers = await User.insertMany(userData, { timeout: false });
//     const newThoughts = await Thought.insertMany(thoughtData, { timeout: false });
//     console.log(newUsers, newThoughts);
//     console.log('Data seeded successfully!');
//   } catch (error) {
//     console.error(error);
//   }
// }

// seedDatabase();
