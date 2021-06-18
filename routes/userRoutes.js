const express = require('express');
const router = express.Router();
const authUser = require('../controllers/userController');
const getUserProfile = require('../controllers/userController');
const registerUser = require('../controllers/userController');
const updateUserProfile = require('../controllers/userController');
const getUsers = require('../controllers/userController');
const deleteUser = require('../controllers/userController');
const getUserById = require('../controllers/userController');
const updateUser = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

module.exports = router;
