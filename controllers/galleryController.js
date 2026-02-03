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