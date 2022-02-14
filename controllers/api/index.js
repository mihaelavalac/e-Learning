const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const courseRoutes = require('./course-routes.js');
const userCoursesRoutes = require('./user-courses-routes.js');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/user-courses', userCoursesRoutes);

module.exports = router;