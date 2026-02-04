const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminService = require('../service/adminService');
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newAdmin = await adminService.registerAdmin(email, password);
        res.status(201).json(newAdmin);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await adminService.loginAdmin(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const updatedAdmin = await adminService.updateAdmin(id, email, password);
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedAdmin = await adminService.deleteAdmin(_id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteAllAdmins = async (req, res) => {
    try {
        await adminService.deleteAllAdmins();
        res.status(200).json({ message: 'All admins deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
