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
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    const newReaction = await Reaction.create({ reactionBody, username });
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => { 
  const thoughts = await Thought.find()
  res.json(thoughts); 
}); 

// DELETE route for removing a reaction from a thought
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: reactionId } },
      { new: true }
    );
    await Reaction.findByIdAndDelete(reactionId);
    res.status(200).json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});





module.exports = router