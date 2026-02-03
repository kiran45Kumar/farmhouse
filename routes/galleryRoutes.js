const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', adminAuth, galleryController.addGallery);
router.get('/', galleryController.getGalleries);
router.get('/category/:categoryId', galleryController.getGalleryByCategory);
router.put('/:id', adminAuth, galleryController.updateGallery);
router.delete('/:id', adminAuth, galleryController.deleteGallery);
router.delete('/', adminAuth, galleryController.deleteAllGalleries);


module.exports = router;