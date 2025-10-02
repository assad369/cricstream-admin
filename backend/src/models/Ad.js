const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['direct', 'banner'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        enum: ['header', 'sidebar', 'footer', 'in-stream'],
        default: 'header'
    },
    clickCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ad', adSchema);