const express = require("express");
const URL = require("../models/urlmodel");
const { restrictTo } = require("../middleware/authmiddleware");

const router = express.Router();

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    const allurls = req.user.role === 'ADMIN'
        ? await URL.find({}).populate('createdBy', 'name email')
        : await URL.find({ createdBy: req.user._id });

    return res.render("home", {
        urls: allurls,
        userName: req.user.name,
        host: `${req.protocol}://${req.get('host')}`,
    });
});
router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allurls = await URL.find({}).populate('createdBy', 'name email');
    return res.render("home", {
        urls: allurls,
        userName: req.user.name,
        host: `${req.protocol}://${req.get('host')}`,
    })
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/login');
});

router.get('/signup', (req, res) => {
    return res.render("signup")
});

router.get('/login', (req, res) => {
    return res.render("login")
});

router.get('/pricing', (req, res) => {
    return res.render("pricing", {
        userName: req.user ? req.user.name : null,
    })
});

router.get('/features', (req, res) => {
    return res.render("features", {
        userName: req.user ? req.user.name : null,
    })
});

module.exports = router;
