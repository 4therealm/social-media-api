const router = require('express').Router();
const User = require('../../models/User')
const Thought = require('../../models/Thought')
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => { 
  const users = await User.find().populate('thoughts friends'); 
  res.json(users); 
}); 

router.get('/:userId', async (req, res) => {
const {userId} = req.params;
try {
  const user = await User.findById(ObjectId(userId))
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  
} catch (error) {
  console.log(error);
      res.status(500).json(error);
}
 
});

router.post('/', async (req, res) => {
  const {username, email, thoughts, friends} = req.body
  User.create({
    username,
    email,
    thoughts,
    friends
  })
    .then(dbUserData => res.status(201).json(dbUserData))
    .catch(err => res.status(500).json(err));
});

// router.put('/:username', (req, res) => {
//   User.findByIdAndUpdate(ObjectId(userId), req.body, { new: true })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         return res.status(404).json({ message: 'No user found with this id!' });
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => res.status(500).json(err));
// });

router.put('/:userId', async (req,res) => {
  const {userId} = req.params
  try {
    const user = await User.findByIdAndUpdate(ObjectId(userId), req.body, { new: true })
    console.log(userId)
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error)
  }
})



router.delete('/:username', (req, res) => {
  User.findByIdAndDelete({ username: req.params.username })
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this username!' });
      }
      // remove user's associated thoughts from the database as well
      return Thought.deleteMany({ username: dbUserData.username });
    })
    .then(() => {
      res.json({ message: 'User and associated thoughts deleted!' });
    })
    .catch(err => res.status(500).json(err));
});


// POST route for adding a friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// DELETE route for removing a friend from a user's friend list
router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { new: true }
    );
    res.status(200).json({ updatedUser, updatedFriend });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});



module.exports = router