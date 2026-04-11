const express = require('express');
const router = express.Router();
const { createPayment, webhook } = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/payment/{orderId}:
 *   post:
 *     summary: Create payment for order
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment URL generated
 *       404:
 *         description: Order not found
 */
router.post('/:orderId', protect, createPayment);

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Paymob webhook
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post('/webhook', webhook);

module.exports = router;