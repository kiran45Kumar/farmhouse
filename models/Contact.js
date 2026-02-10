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
    },
    isDeleted: {
        type: Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, {timestamps: true});

ContactSchema.virtual("createdAtIST").get(function () {
  return this.createdAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

ContactSchema.virtual("updatedAtIST").get(function () {
  return this.updatedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

ContactSchema.set("toJSON", { virtuals: true });
ContactSchema.set("toObject", { virtuals: true });
module.exports = mongoose.model('Contact', ContactSchema);