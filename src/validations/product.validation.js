const { body } = require('express-validator');

const productValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('description')
        .notEmpty().withMessage('Description is required'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Price must be greater than 0'),

    body('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid category id'),

    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isNumeric().withMessage('Stock must be a number')
        .custom(value => value >= 0).withMessage('Stock must be greater than or equal to 0')
];

module.exports = { productValidation };