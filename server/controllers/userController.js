import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Return user in a nested object
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS (Exclude passwords)
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// GET USER BY ID (Exclude password)
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

// UPDATE USER (Rehash password if changed)
export const updateUser = async (req, res) => {
  try {
    const { password, ...updates } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // If password is provided, update it separately (will trigger pre-save hashing)
    if (password) {
      user.password = password;
    }
    Object.assign(user, updates);

    await user.save(); // triggers hashing if password changed

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  user ? res.json({ message: 'User deleted successfully' }) : res.status(404).json({ error: 'User not found' });
};
