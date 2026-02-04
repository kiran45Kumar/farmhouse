const Testimonial = require('../models/Testimonials');
const testimonialService = require('../service/testimonialService');
exports.addTestimonial = async (req, res) => {
    try {
        const { name, message, rating } = req.body;
        const savedTestimonial = await testimonialService.addTestimonial(name, message, rating);
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }   
};
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await testimonialService.getTestimonials();
        res.status(200).json(testimonials);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message, rating } = req.body;
        const updatedTestimonial = await testimonialService.updateTestimonial(id, name, message, rating);
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }   
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTestimonial = await testimonialService.deleteTestimonial(id);
        res.status(200).json({ message: deleteTestimonial.message });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });

    };
};
exports.deleteAllTestimonials = async (req, res) => {
    try {
        const deletedTestimonial = await testimonialService.deleteAllTestimonials();
        res.status(200).json({ message: deletedTestimonial.message });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};
