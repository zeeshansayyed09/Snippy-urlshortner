const express = require('express');
const passport = require('../services/passport');
const { setUser } = require('../services/auth');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));

router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
}), (req, res) => {
    const token = setUser(req.user);
    res.cookie('token', token);

    if (req.user.role === 'ADMIN') return res.redirect('/admin/urls');
    return res.redirect('/');
});

module.exports = router;