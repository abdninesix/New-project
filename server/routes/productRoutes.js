import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Use memory storage (ImageKit needs buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Admin-only for product management
router.post('/', protect, adminOnly, upload.single('image'), createProduct);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
