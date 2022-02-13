const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const courseRoutes = require('./course-routes.js');
const statusRoutes = require('./status-routes.js');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/status', statusRoutes);

module.exports = router;