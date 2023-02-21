const router = require('express').Router();
const Thought = require('../../models/Thought')
const {
  getSingleThought,
  getThoughts,
  createThought
} = require('../../controllers/thoughtsController')


router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought)







module.exports = router