const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', adminAuth, galleryController.addGallery);
router.get('/', galleryController.getGalleries);
router.get('/category/:categoryId', galleryController.getGalleryByCategory);

module.exports = router;