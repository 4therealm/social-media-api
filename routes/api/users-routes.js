const router = require('express').Router();
const User = require('../../models/User')
// const {
//   getSingleUser,
//   getUsers,
//   createUser
// } = require('../../controllers/usersController')
// router.get('/', (req, res) => {
//   res.json({ message: 'reached api/User' });
// });

// router.route('/', (req, res) => {
//   User.Create(req.body)
// })
// router.route('/:userId').get(getSingleUser)

router.get('/', async (req, res) => { 
  const users = await User.find().populate('thoughts friends'); 
  res.json(users); 
}); 


module.exports = router