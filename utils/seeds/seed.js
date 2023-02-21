const mongoose = require('mongoose');
const User = require('../../models/User');
const Thought = require('../../models/Thought');

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Save the instances to the database
async function seedDatabase() {
  try {
    const newUsers = await User.insertMany(userData, { timeout: false });
    const newThoughts = await Thought.insertMany(thoughtData, { timeout: false });
    console.log(newUsers, newThoughts);
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error(error);
  }
}

seedDatabase();
