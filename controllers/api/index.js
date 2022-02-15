const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const courseRoutes = require('./course-routes.js');
const userCoursesRoutes = require('./user-courses-routes.js');
const subCoursesRoutes = require('./sub-courses-routes.js');
const commentRoutes = require('./comments-routes.js');
const likeRoutes = require('./like-routes.js');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/user-courses', userCoursesRoutes);
router.use('/sub-courses', subCoursesRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);


module.exports = router;