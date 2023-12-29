const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const File = require('../models/file');
const Survey = require('../models/survey');

const details = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({
                success: false,
                message: 'No user found!'
            });
        }
        const { firstname, lastname, phone, address1, address2, city, state, country, pin, ans1, ans2, ans3 } = req.body;
        const userDetails = new UserDetails({ firstname, lastname, email: user.email, phone, address1, address2, city, state, country, pin, user: req.user._id });
        await userDetails.save();
        const survey = new Survey({ ans1, ans2, ans3, submittedBy: req.user._id });
        await survey.save();
        const files = req.files.map(file => ({
            url: file.path,
            mimeType: file.mimetype,
            filename: file.filename,
            uploadedBy: req.user._id,
        }));
        const file = await File.create(files);
        res.json({
            success: true,
            message: 'Form submitted successfully.'
        });
    } catch (err) {
        // console.log(err);
        res.json({
            error: true,
            message: err.message
        });
    }
}

const dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({
                success: false,
                message: 'No user found!'
            });
        }
        const userDetails = await UserDetails.findOne({user: req.user._id});
        const files = await File.find({uploadedBy: req.user._id});
        const survey = await Survey.findOne({submittedBy: req.user._id});
        res.json({
            success: true,
            userDetails,
            files,
            survey
        });
    } catch (err) {
        // console.log(err);
        res.json({
            error: true,
            message: err.message
        });
    }
}

module.exports = { details, dashboard };