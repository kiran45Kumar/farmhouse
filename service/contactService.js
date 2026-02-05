const Contact = require('../models/Contact');
exports.submitContact = async (name, email, message, phone, location) => {
    try {
        const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
        const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name ) {
            throw new Error('Name is required');
        }
        else if (!email) {
            throw new Error('Email is required');
        }
        else if(!validateEmailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        else if (!phone) {
            throw new Error('Phone is required');
        }
        else if (!validatePhoneNumberRegex.test(phone)) {
            throw new Error('Invalid phone number format');
        }
        else if (phone.toString().length != 10) {
            throw new Error('Phone number must be 10 digits');
        }
        else if (!location) {
            throw new Error('Location is required');
        }

        const newContact = new Contact({ name, email, message, phone, location });
        const savedContact = await newContact.save();
        return savedContact;
    }
    catch (error) {
        throw error;
    }
};

exports.getContacts = async () => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
       return contacts;
    }
    catch (error) {
        throw error;}
};

exports.deleteContact = async (id) => {
    try {
        const deletedContact = await Contact.findByIdAndUpdate(id, { isDeleted:true, deletedAt: new Date() }, {new: true});
        if (!deletedContact) {
            return { message: 'Contact not found' };
        }
        return { message: 'Contact deleted successfully' };
    }
    catch (error) {
        throw error;
    }
};

exports.deleteAllContacts = async () => {
    try {
        await Contact.deleteMany({});
        return { message: 'All contacts deleted successfully' };
    }   
    catch (error) {
        throw error;
    }
};

exports.updateContact = async (id, name, email, message, phone, location) => {
    try {    
        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (message) updatedData.message = message;
        if (phone) updatedData.phone = phone;
        if (location) updatedData.location = location;
        const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedContact) {
            return {message: "Contact not found"}
        }
        return updatedContact;
    } catch (error) {
        throw error;
    }
};
