const Contact = require('../models/Contact');
const contactService = require('../service/contactService')
exports.submitContact = async (req, res) => {
    try {
        const { name, email, message, phone, location } = req.body;
        const savedContact = await contactService.submitContact(name, email, message, phone, location);
        res.status(201).json(savedContact);
    }
    catch (error) {
        console.log('Error in backend:', error);
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getContacts();
        res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await contactService.deleteContact(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};

exports.deleteAllContacts = async (req, res) => {
    try {
        await contactService.deleteAllContacts();
        res.status(204).json({ message: 'All contacts deleted successfully' });
    }   
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message, phone, location } = req.body;
        const updatedContact = await contactService.updateContact(id, name, email, message, phone, location);
        res.status(204).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message });
    }
};
