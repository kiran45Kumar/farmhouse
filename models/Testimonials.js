const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
     isDeleted: {
      type:Boolean,
      default: false,
    },
     deletedAt: {
        type: Date,
        default: null,
    }
}, {timestamps: true});

TestimonialSchema.virtual("createdAtIST").get(function () {
  return this.createdAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

TestimonialSchema.virtual("updatedAtIST").get(function () {
  return this.updatedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

TestimonialSchema.set("toJSON", { virtuals: true });
TestimonialSchema.set("toObject", { virtuals: true });
module.exports = mongoose.model('Testimonial', TestimonialSchema);