const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../model/users');
const { DataValidation } = require('../dataValidation');

router.post('/register', async (req, res) => {
    // Validate that the body content matches our requirements
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

router.post('/login', async (req, res) => {
    // This will return only the error part instead of the entire object
    const { error } = DataValidation.loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email exists
    const userInDB = await User.findOne({ email: req.body.email });

    if (!userInDB) return res.status(400).send('Email not registered!');

    const validPassword = await bcrypt.compare(req.body.password, userInDB.password);

    if (!validPassword) return res.status(401).send('Invalid password!');

    res.status(200).send('Logged in!');
});

module.exports = router;
