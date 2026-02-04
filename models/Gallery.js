const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image:{
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true});

GallerySchema.virtual("createdAtIST").get(function () {
  return this.createdAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

GallerySchema.virtual("updatedAtIST").get(function () {
  return this.updatedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

GallerySchema.set("toJSON", { virtuals: true });
GallerySchema.set("toObject", { virtuals: true });

module.exports = mongoose.model('Gallery', GallerySchema);
