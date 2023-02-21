const User = require("../models/User");
const { ObjectId } = require("mongodb");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : Thought.findOneAndUpdate(
              { userId: req.params.userId },
              { $pull: { userId: req.params.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: " no user with this id!" })
          : res.json({ message: "user successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    const { userId, friendId } = req.params;
    const updatedUser = User.findByIdAndUpdate(
      ObjectId(userId),
      { $addToSet: { friends: ObjectId(friendId) } },
      { new: true }
    );
    const updatedFriend = User.findByIdAndUpdate(
      ObjectId(friendId),
      { $addToSet: { friends: ObjectId(userId) } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  },

  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    const updatedUser = User.findByIdAndUpdate(
      ObjectId(userId),
      { $pull: { friends: ObjectId(friendId) } },
      { new: true }
    );
    const updatedFriend = User.findByIdAndUpdate(
      ObjectId(friendId),
      { $pull: { friends: ObjectId(userId) } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  },
};
