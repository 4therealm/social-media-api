const Reaction = require('../models/Reaction')

module.exports = {
  getReaction(req, res) {
    Reaction.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single reaction
  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction found with that id' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        return Post.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { reaction: reaction._id } },
          { new: true }
        );
      })
      .then((post) =>
        !post
          ? res
              .status(404)
              .json({ message: 'reaction created, but no posts with this ID' })
          : res.json({ message: 'reaction created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
};

// reactions: [
//   {
//     reactionBody: "Wow, great thought! ❤️",
//     username: "patra",
//   },
//   {
//     reactionBody: "I disagree...",
//     username: "tim",
//   },
// ],

// reactions: [
//   {
//     reactionBody: "That's awesome! 👍 ",
//     username: "maxwell",
//   },
// ],