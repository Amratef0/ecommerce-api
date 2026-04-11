const { body } = require('express-validator');

const categoryValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('description')
        .notEmpty().withMessage('Description is required')
];

module.exports = { categoryValidation };