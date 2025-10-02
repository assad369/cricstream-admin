const mongoose = require('mongoose');

const liveTvSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isLive: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LiveTV', liveTvSchema);