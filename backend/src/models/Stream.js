const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    team1: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        logo: {
            type: String,
            default: ''
        }
    },
    team2: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        logo: {
            type: String,
            default: ''
        }
    },
    date: {
        type: Date,
        required: true
    },
    streamURL: {
        type: String,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isLive: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Stream', streamSchema);