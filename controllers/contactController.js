const Contact = require('../models/Contact');
exports.submitContact = async (req, res) => {
    try {
        const { name, email, message, phone, location } = req.body;
        const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
        const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name ) {
            return res.status(400).json({ message: 'Name is required' });
        }
        else if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        else if(!validateEmailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        else if (!phone) {
            return res.status(400).json({ message: 'Phone is required' });
        }
        else if (!validatePhoneNumberRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }
        else if (phone.toString().length != 10) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
        else if (!location) {
            return res.status(400).json({ message: 'Location is required' });
        }
        const newContact = new Contact({ name, email, message, phone, location });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany({});
        res.status(200).json({ message: 'All contacts deleted successfully' });
    }   
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message, phone, location } = req.body;
        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (message) updatedData.message = message;
        if (phone) updatedData.phone = phone;
        if (location) updatedData.location = location;
        const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
