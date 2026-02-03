const Testimonial = require('../models/Testimonials');
exports.addTestimonial = async (req, res) => {
    try {
        const { name, message, rating } = req.body;
        if (!name ) {
            return res.status(400).json({ message: 'Name is required' });
        }
        else if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        else if (!rating) {
            return res.status(400).json({ message: 'Rating is required' });
        }
        const newTestimonial = new Testimonial({ name, message, rating });
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }   
};
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};