const {check, validationResult} = require('express-validator');
const models = require('../models');
const fs = require('fs');

exports.validateCategory = [

    check('name').notEmpty()
    .withMessage(' name is required!!'),

    check('slug').notEmpty()
    .withMessage('slug is required!!'),

  
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];