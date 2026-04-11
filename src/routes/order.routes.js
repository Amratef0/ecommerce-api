const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus, cancelOrder } = require('../controllers/order.controller');
const { protect, authorizeAdmin } = require('../middlewares/auth.middleware');
const {orderValidation} = require('../validations/order.validation');

router.post('/', protect,orderValidation, createOrder);
router.get('/', protect, authorizeAdmin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, authorizeAdmin, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;