const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: {
        type: String,
        required: function () { return !this.googleId; }
    },
    googleId: {
        type: String, unique: true,
        sparse: true
    },
}, { timestamps: true });



// Hash the password automatically whenever it's created or changed
// Note: Mongoose 9 no longer passes a next() callback — just use async/await
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to check a plaintext password against the stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = User;