const { body } = require('express-validator');

const orderValidation = [
    body('shippingAddress.street')
        .notEmpty().withMessage('Street is required'),

    body('shippingAddress.city')
        .notEmpty().withMessage('City is required'),

    body('shippingAddress.country')
        .notEmpty().withMessage('Country is required')
];

module.exports = { orderValidation };