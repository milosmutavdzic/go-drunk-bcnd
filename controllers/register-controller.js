var db = require('../database');
var bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');

module.exports.registerFieldsValidation = [
    check('username').exists().isLength({ min: 5}).trim().escape().withMessage('Username must be at least 5 characters long'),
    check('email').exists().isEmail().normalizeEmail().withMessage('Email must be in correct format'),
    check('password').exists().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
];
module.exports.registerController = (req, res) => {
    // express-validator on validation errors return array of errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const dateNow = new Date();
    let hash = bcrypt.hashSync(req.body.password, 10);
    let userData = {
        "username": req.body.username,
        "email": req.body.email,
        "password": hash,
        "created_at": dateNow,
        "updated_at": dateNow
    }
    db.insert(userData).into('users').then(data => {
        res.status(200).json({
            success: true,
            message: `Sucessfully registered user with id ${data}`
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: err
        });
    });
}
