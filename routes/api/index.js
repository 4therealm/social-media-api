const router = require('express').Router();
const userRoutes = require('./users-routescopy');
const thoughtRoutes = require('./thoughts-routescopy');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
