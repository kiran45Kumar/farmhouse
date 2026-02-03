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

exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message, rating } = req.body;
        const updatedData = {};
        if (name) updatedData.name = name;
        if (message) updatedData.message = message;
        if (rating) updatedData.rating = rating;
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }   
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });

};
};
exports.deleteAllTestimonials = async (req, res) => {
    try {
        await Testimonial.deleteMany({});
        res.status(200).json({ message: 'All testimonials deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
