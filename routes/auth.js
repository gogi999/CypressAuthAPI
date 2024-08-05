const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../model/users');

const validationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email,
    password: Joi.string().min(6).required()
});

router.post('/register', async (req, res) => {
    // Validae that the body content matches our requirements
    const { error } = validationSchema.validate(req.body);

    if (error) return res.status(400).send(error);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
