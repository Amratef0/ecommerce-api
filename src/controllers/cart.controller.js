const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// @desc    Get cart
// @route   GET /api/cart
const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product', 'name price image');

        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if stock is enough
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity, price: product.price }],
                totalPrice: product.price * quantity
            });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Product exists, update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Product not in cart, add it
                cart.items.push({ product: productId, quantity, price: product.price });
            }

            // Update total price
            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );

            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Update item quantity
// @route   PUT /api/cart/:productId
const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === req.params.productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.items[itemIndex].quantity = quantity;

        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity, 0
        );

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity, 0
        );

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };