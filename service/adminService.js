const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and Password are required');
        }   
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
                throw new Error('Admin already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        const savedAdmin = await newAdmin.save();
        return savedAdmin;
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.loginAdmin = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and Password are required');
        }
        if(email !== process.env.ADMIN_EMAIL){
            throw new Error('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }   
        const token = jwt.sign({ role: "admin", email: process.env.ADMIN_EMAIL}, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.updateAdmin = async (id, email, password) => {
    try {
        const updatedData = {};
        if (email) updatedData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAdmin) {
            throw new Error('Admin not found');
        }
        return updatedAdmin;
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.deleteAdmin = async (_id) => {
    try {
        const deletedAdmin = await Admin.findByIdAndUpdate(_id, {isDeleted:true, deletedAt: new Date()}, {new: true});;
        if (!deletedAdmin) {
            throw new Error('Admin not found');
        }
        return deletedAdmin;
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.deleteAllAdmins = async () => {
    try {
        await Admin.deleteMany({});
        return { message: 'All admins deleted successfully' };
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};
