const jwt = require('jsonwebtoken');
const User = require('../models/users');

function setUser(user) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
    return token;
}

async function getUser(token) {
    try {
        if (!token) return null;
        const secret = process.env.JWT_SECRET || 'changeme';
        const payload = jwt.verify(token, secret);
        const user = await User.findById(payload.id).select('-password');
        return user;
    } catch (err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};