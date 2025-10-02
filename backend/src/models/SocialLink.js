const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SocialLink', socialLinkSchema);