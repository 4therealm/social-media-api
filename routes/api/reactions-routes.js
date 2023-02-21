const router = require('express').Router();
const Reaction = require('../../models/Reaction')
const {
  getSingleReaction,
  getReaction,
  createReaction
} = require('../../controllers/reactionsController')


router.route('/').get(getReaction).post(createReaction)
router.route('/:reactionId').get(getSingleReaction)







module.exports = router