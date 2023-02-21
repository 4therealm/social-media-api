const mongoose = require('mongoose'); 
const { Schema, model } = mongoose;
const {User, Thought} = require('../models')


const ReactionSchema = new Schema({

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});


const Reaction = model('Reaction', ReactionSchema);


module.exports = Reaction;