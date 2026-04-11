const axios = require('axios');
const Order = require('../models/order.model');
const sendEmail = require('../config/email');
const { paymentConfirmationEmail } = require('../templates/email.templates');

const getAuthToken = async () => {
    const response = await axios.post('https://accept.paymob.com/api/auth/tokens', {
        api_key: process.env.PAYMOB_API_KEY
    });
    return response.data.token;
};

const registerOrder = async (authToken, totalPrice) => {
    const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: totalPrice * 100,
        currency: 'EGP',
        items: []
    });
    return response.data.id;
};

const getPaymentKey = async (authToken, paymobOrderId, totalPrice, user) => {
    const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
        auth_token: authToken,
        amount_cents: totalPrice * 100,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
            first_name: user.name,
            last_name: 'N/A',
            email: user.email,
            phone_number: 'N/A',
            apartment: 'N/A',
            floor: 'N/A',
            street: 'N/A',
            building: 'N/A',
            shipping_method: 'N/A',
            postal_code: 'N/A',
            city: 'N/A',
            country: 'N/A',
            state: 'N/A'
        },
        currency: 'EGP',
        integration_id: process.env.PAYMOB_INTEGRATION_ID
    });
    return response.data.token;
};

const createPayment = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const authToken = await getAuthToken();
        const paymobOrderId = await registerOrder(authToken, order.totalPrice);
        const paymentKey = await getPaymentKey(authToken, paymobOrderId, order.totalPrice, order.user);

        const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;

        res.status(200).json({ paymentUrl });
    } catch (error) {
        next(error);
    }
};

const webhook = async (req, res, next) => {
    try {
        const { success, order } = req.body.obj;

        if (success) {
            const updatedOrder = await Order.findByIdAndUpdate(
                order.merchant_order_id,
                { paymentStatus: 'paid' },
                { new: true }
            ).populate('user', 'name email');

            // Send payment confirmation email
            if (updatedOrder) {
                await sendEmail(
                    updatedOrder.user.email,
                    'Payment Successful! 💳',
                    paymentConfirmationEmail(updatedOrder.user.name, updatedOrder)
                );
            }
        }

        res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createPayment, webhook };