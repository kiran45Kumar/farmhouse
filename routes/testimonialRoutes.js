const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', adminAuth, testimonialController.addTestimonial);
router.get('/', testimonialController.getTestimonials);
router.put('/:id', adminAuth, testimonialController.updateTestimonial);
router.delete('/:id', adminAuth, testimonialController.deleteTestimonial);
router.delete('/', adminAuth, testimonialController.deleteAllTestimonials);

module.exports = router;   