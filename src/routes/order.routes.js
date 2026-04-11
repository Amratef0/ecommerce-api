const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus, cancelOrder } = require('../controllers/order.controller');
const { protect, authorizeAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { orderValidation } = require('../validations/order.validation');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Cart is empty
 */
router.post('/', protect, orderValidation, validate, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Not authorized
 */
router.get('/', protect, authorizeAdmin, getOrders);

/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       401:
 *         description: Not authorized
 */
router.get('/myorders', protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get('/:id', protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */
router.put('/:id', protect, authorizeAdmin, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 *       400:
 *         description: Cannot cancel delivered order
 */
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;