const router = require('express').Router();
const User = require('../../models/User')
const {
  getSingleUser,
  getUsers,
  createUser
} = require('../../controllers/usersController')


router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getSingleUser)




module.exports = router