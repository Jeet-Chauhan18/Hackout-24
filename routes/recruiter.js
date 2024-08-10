const express = require('express');
const router = express.Router();
const Repo = require('../models/Repo');

// Recruiter dashboard route - view most liked repos
router.get('/dashboard', async (req, res) => {
    const repos = await Repo.find().sort({ likes: -1 }).limit(10).populate('user');
    res.render('recruiter_dashboard', { repos });
});

module.exports = router;
