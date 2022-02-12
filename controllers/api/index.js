const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const courseRoutes = require('./course-routes.js');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);

module.exports = router;