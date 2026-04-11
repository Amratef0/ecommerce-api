const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { updateUserValidation } = require('../validations/user.validation');


router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.post('/', protect, createUser);
router.put('/:id', protect, updateUserValidation, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;