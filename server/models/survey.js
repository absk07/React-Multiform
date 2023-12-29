const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    ans1: {
        type: String
    },
    ans2: {
        type: String
    },
    ans3: {
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;