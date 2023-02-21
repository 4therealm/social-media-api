const mongoose = require("mongoose");
const { Schema } = mongoose;

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", ThoughtSchema);

function dateFormat(timestamp) {
  return new Date(timestamp).toISOString();
}

const dummyThoughts = [
  {
    thoughtText: "This is my first thought!",
    username: "john_doe",
    reactions: [
      {
        reactionBody: "Wow, great thought!",
        username: "jane_doe",
      },
      {
        reactionBody: "I disagree...",
        username: "bob_smith",
      },
    ],
  },
  {
    thoughtText: "I'm having a great day!",
    username: "jane_doe",
    reactions: [
      {
        reactionBody: "That's awesome!",
        username: "john_doe",
      },
    ],
  },
];

Thought.find({})
  .then((thoughts) => {
    if (thoughts.length === 0) {
      return Thought.insertMany(dummyThoughts);
    } else {
      console.log("Thoughts already exist.");
      return null;
    }
  })
  .then((result) => {
    if (result !== null) {
      console.log("Successfully inserted thoughts.");
    }
  })
  .catch((error) => console.log(error.message));

  module.exports = Thought