const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
    ,
    isDeleted: {
        type: Boolean,
        default:false,
    },
     deletedAt: {
        type: Date,
        default: null,
    }

}, {timestamps: true});

CategorySchema.virtual("createdAtIST").get(function () {
  return this.createdAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});


CategorySchema.virtual("updatedAtIST").get(function () {
  return this.updatedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
});

CategorySchema.set("toJSON", { virtuals: true });
CategorySchema.set("toObject", { virtuals: true });
module.exports = mongoose.model('Category', CategorySchema);
