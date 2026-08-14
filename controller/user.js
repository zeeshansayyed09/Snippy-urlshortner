const User = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../services/auth');
const { response } = require('express');



const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
        return res.render("signup", {
            error: "Please use a valid email !",
        });
    }

    await User.create({
        name,
        email,
        password
    });
    return res.render("home");
};

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
        return res.render("signup", {
            error: "Please use a valid email !",
        });
    }

    const user = await User.findOne({ email });

    if (!user)
        return res.render("login", {
            error: "Invalid Email or Password",
        });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return res.render("login", {
            error: "Invalid Email or Password",
        });

    const token = setUser(user);
    res.cookie("token", token)

    if (user.role === "ADMIN")
        return res.redirect('/admin/urls');

    return res.redirect('/')
};


module.exports = {
    handleUserSignup,
    handleUserLogin
}