const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Email and Password is required!'
            });
        }
        const already_user = await User.findOne({ email });
        if (already_user) {
            return res.json({
                success: false,
                message: 'User with the email already exixts.'
            });
        }
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.json({
            success: true,
            message: 'User successfully registered.',
            email: user.email,
            token: token
        });
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Email and Password is required!'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: 'Please register first.'
            });
        }
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.json({
            success: true,
            message: 'User logged in.',
            email: user.email,
            token: token
        });
    } catch (err) {
        console.log(err);
        res.json({
            error: true,
            message: err.message
        });
    }
}

module.exports = { register, login };