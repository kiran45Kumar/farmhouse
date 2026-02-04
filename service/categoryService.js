const Category = require('../models/Category');

exports.createCategory = async (name, description) => {
    try {
        const exists = await Category.findOne({ name });
        if (exists) {
            throw new Error('Category already exists');
        }
        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();
        return savedCategory;
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};
exports.getCategories = async () => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return categories;
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.getCategoryById = async (id) => {
    try {
        const category = await Category.findById(id)
        return category;
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
}
exports.updateCategory = async (id, name, description) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedCategory) {
            throw new Error('Category not found');
        }
        return updatedCategory;
    } catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};


exports.deleteCategory = async (id) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error('Category not found');
        }
        return deletedCategory;
    }
    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};

exports.deleteAllCategories = async () => {
    try {
        await Category.deleteMany({});
        return { message: 'All categories deleted successfully' };
    }

    catch (error) {
        throw new Error('Server Error: ' + error.message);
    }
};