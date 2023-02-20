const mongoose = require('mongoose'); 
const { Schema } = mongoose;

class Thought { 
  constructor() { 
    const thoughtSchema = new Schema({ 
      thoughtText: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 280 
      }, 
      createdAt: { 
        type: Date, 
        default: Date.now, 
        get: (timestamp) => dateFormat(timestamp) 
      }, 
      username: { 
        type: String, 
        required: true 
      }, 
      reactions: [Reaction] 
    }, { 
      toJSON: { 
        virtuals: true, 
        getters: true 
      }, 
      id: false 
    }); 
    thoughtSchema.virtual('reactionCount').get(function() { 
      return this.reactions.length; 
    }); 
    this.ThoughtModel = mongoose.model('Thought', thoughtSchema); 
  } 
  getModel() { 
    return this.ThoughtModel; 
  } 
}

module.exports = Thought