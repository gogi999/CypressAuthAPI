const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../model/users');
const { DataValidation } = require('../dataValidation');

router.post('/register', async (req, res) => {
    // Validae that the body content matches our requirements
    const { error } = DataValidation.registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Check to make sure that user doesn't exist
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) return res.status(400).send('Email already registered!');

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
