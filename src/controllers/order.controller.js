const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const sendEmail = require('../config/email');
const { orderConfirmationEmail, orderCancelledEmail } = require('../templates/email.templates');

const createOrder = async (req, res, next) => {
    try {
        const { shippingAddress } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = await Order.create({
            user: req.user._id,
            items: cart.items,
            totalPrice: cart.totalPrice,
            shippingAddress
        });

        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        // Send order confirmation email
        // Send order confirmation email
try {
    await sendEmail(
        req.user.email,
        'Order Confirmed! 🛍️',
        orderConfirmationEmail(req.user.name, order)
    );
    console.log('Email sent to:', req.user.email);
} catch (emailError) {
    console.log('Email error:', emailError.message);
}

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Order.countDocuments();

        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name price')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            orders
        });
    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name price image');
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name price image');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { status, paymentStatus } = req.body;

        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status) order.status = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status === 'delivered') {
            return res.status(400).json({ message: 'Cannot cancel delivered order' });
        }

        order.status = 'cancelled';
        await order.save();

        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        // Send order cancelled email
        await sendEmail(
            order.user.email,
            'Order Cancelled ❌',
            orderCancelledEmail(order.user.name, order)
        );

        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus, cancelOrder };