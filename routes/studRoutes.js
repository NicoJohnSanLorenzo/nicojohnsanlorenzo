const express = require('express');
const { getAllStud, getStudById, createStud, updateStud, deleteStud } = require('../controllers/studController');
const authenticateToken = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/', authenticateToken, getAllStud);
router.get('/:id', authenticateToken, getStudById);
router.post('/', authenticateToken, createStud);
router.put('/:id', authenticateToken, updateStud);
router.delete('/:id', authenticateToken, deleteStud);

module.exports = router;
