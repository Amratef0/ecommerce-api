const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect, authorizeAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { productValidation } = require('../validations/product.validation');
const upload = require('../config/multer');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryId', getProductsByCategory);
router.post('/', protect, authorizeAdmin, upload.single('image'), productValidation, validate, createProduct);
router.put('/:id', protect, authorizeAdmin, upload.single('image'), productValidation, validate, updateProduct);
router.delete('/:id', protect, authorizeAdmin, deleteProduct);

module.exports = router;