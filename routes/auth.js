const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/auth/login');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        console.log("User not found");
        return res.redirect('/auth/login');
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/repo/dashboard');
    } else {
        console.log("Password mismatch");
        res.redirect('/auth/login');
    }
});

module.exports = router;
