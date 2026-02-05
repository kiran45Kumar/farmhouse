const Gallery = require('../models/Gallery');
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');
exports.addGallery = async ({title, description, image, categoryId}) => {
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
        const newGallery = new Gallery({ title, description, image: `/uploads/gallery/${image.filename}`, category: category._id });
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

    if (image) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        gallery.image
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      gallery.image = `/uploads/gallery/${image.filename}`;
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