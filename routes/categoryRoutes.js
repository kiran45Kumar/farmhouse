const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const adminAuth = require('../middleware/adminAuth');


router.post('/', adminAuth, categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', adminAuth, categoryController.getCategory);
router.put('/:id', adminAuth, categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);
router.delete('/', adminAuth, categoryController.deleteAllCategories);

module.exports = router;