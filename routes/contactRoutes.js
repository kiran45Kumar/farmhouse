const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const adminAuth = require('../middleware/adminAuth');
router.post('/', contactController.submitContact);
router.get('/', adminAuth, contactController.getContacts);
router.delete('/:id', adminAuth, contactController.deleteContact);
router.put('/:id', adminAuth, contactController.updateContact);
router.delete('/', adminAuth, contactController.deleteAllContacts);

module.exports = router;