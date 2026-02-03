const Gallery = require('../models/Gallery');

exports.addGallery = async (req, res) => {
    try {
        const { title, description, image, category } = req.body;
        if (!title || !image) {
            return res.status(400).json({ message: 'Title and Image are required' });
        }
        const newGallery = new Gallery({ title, description, image, category });
        const savedGallery = await newGallery.save();
        res.status(201).json(savedGallery);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(galleries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getGalleryByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const galleries = await Gallery.find({ category: categoryId })
    .populate("category", "name");

  res.json(galleries);
};

exports.updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, category } = req.body;
        const updatedData = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;
        if (image) updatedData.image = image;
        if (category) updatedData.category = category;
        const updatedGallery = await Gallery.findByIdAndUpdate(id, updatedData, { new: true
        });
        if (!updatedGallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(updatedGallery);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGallery = await Gallery.findByIdAndDelete(id);
        if (!deletedGallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json({ message: 'Gallery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteAllGalleries = async (req, res) => {
    try {
        await Gallery.deleteMany({});
        res.status(200).json({ message: 'All galleries deleted successfully' });
    }   
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};