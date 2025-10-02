const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);