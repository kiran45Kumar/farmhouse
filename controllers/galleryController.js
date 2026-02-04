const galleryService = require('../service/galleryService')
exports.addGallery = async (req, res) => {
    try {
        const gallery = await galleryService.addGallery({
            title: req.body.title,
            categoryId: req.body.categoryId,
            description: req.body.description,
            image: req.file
        });

        res.status(201).json(gallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGalleries = async (req, res) => {
    try {
        const galleries = await galleryService.getGalleries();
        res.status(200).json(galleries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getGalleryByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const galleries = await galleryService.getGalleryByCategory(categoryId);
        res.status(200).json(galleries);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;
    const image = req.file;

    const updatedGallery = await galleryService.updateGallery(
      id,
      title,
      description,
      image,
      categoryId
    );

    if (!updatedGallery) {
      throw new Error("Gallery not found");
    }

    res.status(200).json(updatedGallery);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGallery = await galleryService.deleteGallery(id);
        if (!deletedGallery) {
            throw new Error('Gallery not found');
        }
        res.status(204).json({message: "Gallery deleted successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAllGalleries = async (req, res) => {
    try {
        await galleryService.deleteAllGalleries();
        res.status(204).json({message: "All galleries deleted successfully"});
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};