const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
     phone: {
        type: Number,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Contact', ContactSchema);