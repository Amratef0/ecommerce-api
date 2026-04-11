const { body } = require('express-validator');

const addToCartValidation = [
    body('productId')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID'),

    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isNumeric().withMessage('Quantity must be a number')
        .custom(value => value > 0).withMessage('Quantity must be greater than 0')
];

const updateCartValidation = [
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isNumeric().withMessage('Quantity must be a number')
        .custom(value => value > 0).withMessage('Quantity must be greater than 0')
];

module.exports = { addToCartValidation, updateCartValidation };