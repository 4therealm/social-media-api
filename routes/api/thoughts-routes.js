const router = require('express').Router();
const Thought = require('../../models/Thought')


router.get('/', async (req, res) => { 
  const thoughts = await Thought.find()
  res.json(thoughts); 
}); 


router.put('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/api/thoughts/:id', async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted' });
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