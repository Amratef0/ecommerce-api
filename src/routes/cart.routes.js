const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');
const { addToCartValidation,updateCartValidation } = require('../validations/cart.validation');


router.get('/', protect, getCart);
router.post('/', protect,addToCartValidation, addToCart);
router.put('/:productId', protect,updateCartValidation, updateCartItem);
router.delete('/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;