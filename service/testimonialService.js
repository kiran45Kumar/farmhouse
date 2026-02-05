const Testimonial = require('../models/Testimonials');
exports.addTestimonial = async (name, message, rating) => {
    try {
        if (!name ) {
            throw new Error('Name is required' );
        }
        else if (!message) {
            throw new Error('Message is required' );
        }
        else if (!rating) {
            throw new Error('Rating is required' );
        }
        const newTestimonial = new Testimonial({ name, message, rating });
        const savedTestimonial = await newTestimonial.save();
        return savedTestimonial;
    } catch (error) {
            throw new Error('Server error: ' + error.message);
    }   
};
exports.getTestimonials = async () => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        return testimonials;
    }
    catch (error) {
            throw new Error('Server error: ' + error.message);
    }
};

exports.updateTestimonial = async (id, name, message, rating) => {
    try {
        const updatedData = {};
        if (name) updatedData.name = name;
        if (message) updatedData.message = message;
        if (rating) updatedData.rating = rating;
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTestimonial) {
            throw new Error("Testimonial not found");
        }
        return updatedTestimonial;
    } catch (error) {
            throw new Error('Server error: ' + error.message);
    }   
};

exports.deleteTestimonial = async (id) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndUpdate(id, {isDeleted:true, deletedAt: new Date()}, {new: true});
        if (!deletedTestimonial) {
            throw new Error("Testimonial not found");
        }
        return {message: "Testimonial deleted successfully"};
    }
    catch (error) {
            throw new Error('Server error: ' + error.message);
    };
};
exports.deleteAllTestimonials = async () => {
    try {
        await Testimonial.deleteMany({});
        return { message: 'All testimonials deleted successfully' };
    }
    catch (error) {
            throw new Error('Server error: ' + error.message);
    }
};
