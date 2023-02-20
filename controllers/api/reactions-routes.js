const router = require('express').Router();
const Reaction = require('../../models/Reaction')




router.get('/', async (req, res) => { 
  res.json({message: "api/reactions reached"})
  }); 






module.exports = router