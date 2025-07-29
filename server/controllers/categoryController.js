import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  category ? res.json(category) : res.status(404).json({ error: 'Not found' });
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  category ? res.json(category) : res.status(404).json({ error: 'Not found' });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  category ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
};