const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const adminAuth = require('../middleware/adminAuth');

router.post('/login', adminController.loginAdmin);
router.post('/register', adminController.registerAdmin);

module.exports = router;