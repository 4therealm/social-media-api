const router = require('express').Router();
const Thought = require('../../models/Thought')


router.get('/', async (req, res) => { 
  const thoughts = await Thought.find()
  res.json(thoughts); 
}); 







module.exports = router