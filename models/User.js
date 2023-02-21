const mongoose = require('mongoose'); 
const { Schema, model} = mongoose; 
class User { 
  constructor() { 
    const userSchema = new Schema({ 
      username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
      }, 
      email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
      }, 
      thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought' 
      }], 
      friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
      }] 
    }, { 
      toJSON: { 
        virtuals: true 
      }, 
      id: false 
    }); 
    userSchema.virtual('friendCount').get(function() { 
      return this.friends.length; 
    }); 
    this.UserModel = mongoose.model('User', userSchema); 
  } 
  getModel() { 
    return this.UserModel; 
  } 
}

module.exports = User