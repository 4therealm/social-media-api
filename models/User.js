const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", UserSchema);
const handleError = (err) => console.error(err);
const userDummyData = [
  {
    "username": "johndoe",
    "email": "johndoe@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "janedoe",
    "email": "janedoe@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "bobsmith",
    "email": "bobsmith@gmail.com",
    "thoughts": [],
    "friends": []
  },
  {
    "username": "amandajones",
    "email": "amandajones@gmail.com",
    "thoughts": [],
    "friends": []
  }
]
User.find({}).exec((err, collection) => {
  if (err) {
    return handleError(err);
  }
  if (collection.length === 0) {
    return User.insertMany(userDummyData,
      (insertError) =>
        insertError ? handleError(insertError) : console.log(" Users inserted")
    );
  }
  return console.log(" Users is already populated");
});
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = User;
