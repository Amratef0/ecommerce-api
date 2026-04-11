const express = require('express');
const router = express.Router();
const { createPayment, webhook } = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/:orderId', protect, createPayment);
router.post('/webhook', webhook);

module.exports = router;