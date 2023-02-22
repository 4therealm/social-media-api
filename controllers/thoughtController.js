const { Thought, User, Reaction } = require("../models");
const { ObjectId } = require("mongodb");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new Thought
  async createThought(req, res) {
    const { thoughtText, username } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    {
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: [newThought] } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought created, but could not find user with that ID",
        });
      }
      return res.json({
        message: "Thought created successfully!",
        thought: newThought,
      });
    }
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  async deleteThought(req, res) {
    const { thoughtId } = req.params;
    const thought = await Thought.findByIdAndRemove(ObjectId(thoughtId));

    // !thought
    //   ? res.status(404).json({ message: "No thought with this id!" })
      const user = await User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: ObjectId(thoughtId) } },
          { new: true }
        )
        .catch((err) => res.status(500).json(err));
  },

  // Add a Thought response
  addThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: ObjectId(req.params.thoughtId) },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove Thought response
  removeThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
