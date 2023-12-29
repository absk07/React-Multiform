const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    url: {
        type: String
    },
    mimeType: {
        type: String
    },
    filename: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;