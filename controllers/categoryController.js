const Category = require('../models/Category');
exports.createCategory = async (req, res) => {
try{
    const {name, description} = req.body;
    const exists = await Category.findOne({name});
    if(exists){
        return res.status(400).json({message: 'Category already exists'});
    }
    const newCategory = new Category({name, description});
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);

}
catch(error){
    res.status(500).json({message: 'Server Error', error});
}
};    
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });   
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );  
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteAllCategories = async (req, res) => {
    try {
        await Category.deleteMany({});
        res.status(200).json({ message: 'All categories deleted successfully' });
    }

    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};