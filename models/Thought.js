
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // getter for ISO format
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // getter for ISO format
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
