const express = require('express');
const { getCourseStud, getDeptCourses } = require('../controllers/newController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateToken, getCourseStud);
router.get('/', authenticateToken, getDeptCourses);

module.exports = router;