const mongoose = require('mongoose');

const baseUrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BaseURL', baseUrlSchema);