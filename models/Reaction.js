// models/Reaction.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
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
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = mongoose.model("Reaction", ReactionSchema);

module.exports = Reaction;
