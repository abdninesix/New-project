import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protect, adminOnly, getAllUsers);    // Admins only
router.get('/:id', protect, getUserById);            // Any logged-in user
router.put('/:id', protect, updateUser);             // User can update self
router.delete('/:id', protect, adminOnly, deleteUser); // Admin only

export default router;
