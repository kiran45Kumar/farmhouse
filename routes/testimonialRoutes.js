const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', adminAuth, testimonialController.addTestimonial);
router.get('/', testimonialController.getTestimonials);

module.exports = router;   