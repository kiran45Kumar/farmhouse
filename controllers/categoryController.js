const Category = require("../models/Category");
const categoryService = require("../service/categoryService");
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const savedCategory = await categoryService.createCategory(
            name,
            description,
        );
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error:error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error:error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error:error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await categoryService.updateCategory(
            id,
            name,
            description,
        );
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error:error.message });
    }
};

exports.deleteAllCategories = async (req, res) => {
    try {
        await categoryService.deleteAllCategories();
        res.status(200).json({ message: "All categories deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error:error.message });
    }
};
