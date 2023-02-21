const router = require('express').Router();
const Thought = require('../../models/Thought')
const Reaction = require('../../models/Reaction')
const { ObjectId } = require("mongodb");

//get all thoughts
router.get('/', async (req, res) => { 
  const thoughts = await Thought.find()
  res.json(thoughts); 
});
//get thought by id
router.get('/:thoughtId', async (req,res) => {
  const {thoughtId} = req.params
  const thoughts = await Thought.findById(ObjectId(thoughtId))
  res.json(thoughts)
})
//create thought
router.post('/', async (req, res) => {
  const {thoughtText, username} = req.body
  try {
    const newThought = await Thought.create({
      thoughtText,
      username
    })
    res
      .status(201)
      .json(newThought)
  } catch (error) {
    res
      .status(500)
      .json(error)
  }
})
//update thought by id
router.put('/:thoughtId', async (req, res) => {
  const {thoughtId} = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(ObjectId(thoughtId), req.body, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete thought and all associated reactions
router.delete('/:thoughtId', async (req, res) => {
  const {thoughtId} = req.params
  try {
   const thought = await Thought.findByIdAndDelete(ObjectId(thoughtId));
   if (!thought) {
    return res
      .status(404)
      .json({message: 'no thought found with this id'})
   }
await Reaction.deleteMany({thoughtId: thought.thoughtId})

    res.json({ message: `thought Id: ${thoughtId} \n and associated reactions deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//add reaction to thought
router.post('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
    try {
    const newReaction = await Reaction.create({ reactionBody, username });
    const updatedThought = await Thought.findByIdAndUpdate(
      ObjectId(thoughtId),
      { $push: { reactions: newReaction} },
      { new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//removing a reaction from a thought
// router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
//   const { thoughtId, reactionId } = req.params;

//   try {
//     const updatedThought = await Thought.findByIdAndUpdate(
//       ObjectId(thoughtId),
//       { $pull: { reactions: reactionId } },
//       { new: true }
//     );
//     await Reaction.findByIdAndDelete(reactionId);
//     res.status(200).json({message:`reaction Id ${reactionId} deleted` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    await Reaction.findByIdAndDelete(reactionId);
    res.status(200).json({ message: `Reaction with id ${reactionId} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});





module.exports = router