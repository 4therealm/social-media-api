const router = require('express').Router();
const Thought = require('../../models/Thought')



router.get('/', async (req, res) => { 
  res.json({message: "api/thoughts reached"})
  }); 







module.exports = router