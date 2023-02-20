const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes')
const reactionsRoutes = require('./reactions-routes')
const usersRoutes = require('./users-routes')
router.get('/', (req, res) => {
  res.json({ message: 'reached api/index' });
});

router.use('/thoughts', thoughtsRoutes)
router.use('/reactions', reactionsRoutes)
router.use('/users', usersRoutes)

module.exports = router;