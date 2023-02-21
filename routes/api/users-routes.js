const router = require("express").Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");
const { ObjectId } = require("mongodb");


//get all users
router.get("/", async (req, res) => {
  const users = await User.find().populate("thoughts friends");
  res.json(users);
});
//get single user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(ObjectId(userId))
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v");
    if (!user) {
      return res.status(404).json({ message: "No user found with this id!" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//create new user
router.post("/", async (req, res) => {
  const { username, email, thoughts, friends } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      thoughts,
      friends,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update user
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(ObjectId(userId), req.body, {
      new: true,
    });
    console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found with this id!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete user
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(ObjectId(userId));
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this username!" });
    }
    // remove user's associated thoughts from the database as well
    await Thought.deleteMany({ userId: user.userId });
    res.json({ message: "User and associated thoughts deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});
//adding a friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(userId),
      { $addToSet: { friends: ObjectId(friendId) } },
      { new: true }
    );
    const updatedFriend = await User.findByIdAndUpdate(
      ObjectId(friendId),
      { $addToSet: { friends: ObjectId(userId) } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
//removing a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(userId),
      { $pull: { friends: ObjectId(friendId) } },
      { new: true }
    );
    const updatedFriend = await User.findByIdAndUpdate(
      ObjectId(friendId),
      { $pull: { friends: ObjectId(userId) } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
