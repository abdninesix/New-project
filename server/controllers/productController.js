import imagekit from "../config/imagekit.js";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (for now)
export const createProduct = asyncHandler(async (req, res) => {

  const { name, price, description, category, stock } = req.body;
  const file = req.file;

  if (!name || price === undefined || !description || !category || stock === undefined || !file) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Validate MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  // Upload image to ImageKit

  const response = await imagekit.upload({
    file: file.buffer,
    fileName: file.originalname,
    folder: '/ecommerce',
    useUniqueFileName: true,
  });

  const product = await Product.create({
    name,
    price,
    description,
    category,
    stock,
    image: response.url,
    imageFileId: response.fileId,
  });

  res.status(201).json(product);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (will secure later)
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const file = req.file;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // If a new file is uploaded, upload to ImageKit
  if (file) {
    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: '/ecommerce',
      useUniqueFileName: true,
    });

    // Optionally delete old image
    if (product.imageFileId) {
      try {
        await imagekit.deleteFile(product.imageFileId);
        await imagekit.purgeCache(product.image);
      } catch (error) {
        console.error("ImageKit cleanup error:", error.message);
      }
    }

    product.image = uploadResponse.url;
    product.imageFileId = uploadResponse.fileId;
  }

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  product.category = category ?? product.category;
  product.stock = stock ?? product.stock;

  const updated = await product.save();
  res.json(updated);
});


// @desc    Delete a product and its image from ImageKit
// @route   DELETE /api/products/:id
// @access  Public (secure later)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Delete image from ImageKit
  if (product.imageFileId) {
    try {
      await imagekit.deleteFile(product.imageFileId);
      await imagekit.purgeCache(product.image);
    } catch (error) {
      console.error("ImageKit deletion/purge error:", error.message);
    }
  }
  await product.deleteOne();
  res.json({ message: "Product and image deleted successfully" });
});
