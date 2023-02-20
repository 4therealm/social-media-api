const mongoose = require('mongoose');
const faker = require('faker');

const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Seed users
const userCount = 5;
const users = [];

for (let i = 0; i < userCount; i++) {
  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });
  users.push(user);
}

// Seed thoughts
const thoughtCount = 10;
const thoughts = [];

for (let i = 0; i < thoughtCount; i++) {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const thought = new Thought({
    thoughtText: faker.lorem.sentence(),
    username: randomUser.username,
  });
  thoughts.push(thought);
}

// Seed reactions
const reactionCount = 20;
const reactions = [];

for (let i = 0; i < reactionCount; i++) {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
  const reaction = new Reaction({
    reactionBody: faker.lorem.sentence(),
    username: randomUser.username,
    thoughtId: randomThought._id,
  });
  reactions.push(reaction);
}

// Save all data to MongoDB
Promise.all(users.map((user) => user.save()))
  .then(() => Promise.all(thoughts.map((thought) => thought.save())))
  .then(() => Promise.all(reactions.map((reaction) => reaction.save())))
  .then(() => console.log('Seed data successfully added to database'))
  .catch((err) => console.error(err))
  .finally(() => mongoose.disconnect());
