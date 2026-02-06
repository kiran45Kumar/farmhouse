const Gallery = require('../models/Gallery');
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');
const uploadFromBuffer = require("../utils/cloudinaryUpload");
const cloudinary = require('../config/cloudinaryConfig')
exports.addGallery = async ({title, description, image, categoryId, result}) => {
    // console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);
    try {
        if (!title) {
            throw new Error('Title is required');
        }
        else if (!image) {
            throw new Error('Image is required.');
        }
        else if (!categoryId) {
            throw new Error('Category Id is required.');
        }
        const category = await Category.findById(categoryId)
        if (!category) {
            throw new Error("Invalid category");
        }
        
        const newGallery = new Gallery({ 
            title, 
            description, 
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            },
            imagePublicId:image.publicId,
            category: category._id 
        });
        const savedGallery = await newGallery.save();
        return savedGallery
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.getGalleries = async (req, res) => {
    try {
        // console.log(req.url);
        const galleries = await Gallery.find().sort({ createdAt: -1 });
        return galleries;
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.getGalleryByCategory = async (categoryId) => {
    try {
        const galleries = await Gallery.find({ category: categoryId })
            .populate("category", "name");

        return galleries
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.updateGallery = async ( id, title, description, image, categoryId ) => {
  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new Error("Gallery not found");
    }
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Invalid category");
      }
      gallery.category = category._id;
    }
    if (title) gallery.title = title;
    if (description) gallery.description = description;
    if (image && image.buffer) {
      if (gallery.image?.publicId) {
        await cloudinary.uploader.destroy(gallery.image.publicId);
      }
      const result = await uploadFromBuffer(image.buffer);
      gallery.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
    return await gallery.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteGallery = async (id) => {
    try {
        const deletedGallery = await Gallery.findByIdAndUpdate(id, { isDeleted:true, deletedAt: new Date() }, { new: true });
        if (!deletedGallery) {
            throw new Error('Gallery not found');
        }
        return {Deleted: deletedGallery.isDeleted, deletedAt: deletedGallery.deletedAt};
    } catch (error) {
        throw new Error('Server error: ' + error.message);
    }
};

exports.deleteAllGalleries = async () => {
    try {
        await Gallery.deleteMany({});
        return { message: "All galleries has been deleted successfully." }
    }
    catch (error) {
        throw new Error('Server error: ' + error.message);
    }
};