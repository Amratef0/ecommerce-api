const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { protect, authorizeAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { categoryValidation } = require('../validations/category.validation');
const upload = require('../config/multer');

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', protect, authorizeAdmin, upload.single('image'), categoryValidation, validate, createCategory);
router.put('/:id', protect, authorizeAdmin, upload.single('image'), categoryValidation, validate, updateCategory);
router.delete('/:id', protect, authorizeAdmin, deleteCategory);

module.exports = router;