const mongoose = require('mongoose'); 
const { Schema } = mongoose;

class Reaction { 
  constructor() { 
    const reactionSchema = new Schema({ 
      reactionId: { 
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId() 
      }, 
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
    }); 
    this.ReactionModel = mongoose.model('Reaction', reactionSchema); 
  } 
  getModel() { 
    return this.ReactionModel; 
  } 
}

module.exports = Reaction