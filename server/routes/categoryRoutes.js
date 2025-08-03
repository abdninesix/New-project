import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

export default router;
