import User from "../models/User.js";


export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'Not found' });
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  user ? res.json(user) : res.status(404).json({ error: 'Not found' });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  user ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
};