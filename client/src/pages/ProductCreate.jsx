import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';
import {
  PackagePlus,
  List,
  Tags,
  Edit3,
  Trash2,
  Image as ImageIcon,
  LayoutDashboard,
} from 'lucide-react';

const ProductCreate = () => {
  const [activeTab, setActiveTab] = useState('product'); // product | category | list

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  // Fetch categories & products
  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Handle product input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create or Update Product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, key === 'price' || key === 'stock' ? Number(value) : value);
      });

      if (editProductId) {
        await API.put(`/products/${editProductId}`, data);
        toast.success('Product updated successfully!');
        setEditProductId(null);
      } else {
        await API.post('/products', data);
        toast.success('Product created successfully!');
      }

      setFormData({ name: '', price: '', stock: '', category: '', description: '', image: null });
      setImagePreview(null);
      e.target.reset();
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to save product.');
    }
  };

  // Create or Update Category
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        await API.put(`/categories/${editCategoryId}`, { name: categoryName });
        toast.success('Category updated successfully!');
        setEditCategoryId(null);
      } else {
        await API.post('/categories', { name: categoryName });
        toast.success('Category created successfully!');
      }
      setCategoryName('');
      fetchCategories();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to save category.');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to delete product.');
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to delete category.');
    }
  };

  // Edit Product
  const handleEditProduct = (product) => {
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category?._id || '',
      description: product.description,
      image: null,
    });
    setImagePreview(product.image);
    setActiveTab('product');
  };

  // Edit Category
  const handleEditCategory = (category) => {
    setEditCategoryId(category._id);
    setCategoryName(category.name);
    setActiveTab('category');
  };

  return (
    <div className="min-h-[80vh] py-8 px-4 md:px-8 bg-[#F7FAFC] duration-200">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-2">
            <LayoutDashboard /> Admin Dashboard
          </h1>
          <p className="text-center text-sm mt-1 text-blue-100">Manage Products & Categories</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap md:flex-nowrap">
          {[
            { key: 'product', icon: <PackagePlus className="w-4 h-4" /> },
            { key: 'category', icon: <Tags className="w-4 h-4" /> },
            { key: 'list', icon: <List className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm md:text-base font-medium
              ${activeTab === tab.key
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              {tab.icon}
              {tab.key === 'product' && (editProductId ? 'Edit Product' : 'Add Product')}
              {tab.key === 'category' && (editCategoryId ? 'Edit Category' : 'Add Category')}
              {tab.key === 'list' && 'Product List'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Form */}
          {activeTab === 'product' && (
            <form
              onSubmit={handleSubmitProduct}
              className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full p-3 border border-gray-300 outline-blue-500 rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-3 border border-gray-300 outline-blue-500 rounded"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="w-full p-3 border border-gray-300 outline-blue-500 rounded"
                value={formData.stock}
                onChange={handleChange}
                required
              />
              <select
                name="category"
                className="w-full p-3 border border-gray-300 outline-blue-500 rounded"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                placeholder="Description"
                className="w-full md:col-span-2 p-3 border border-gray-300 outline-blue-500 rounded resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />

              {/* Custom Image Upload */}
              <div className="md:col-span-2 flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50">
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                  <span className="text-gray-600">Click to upload product image</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded border border-gray-300"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full md:col-span-2 bg-blue-600 text-white px-4 py-3 cursor-pointer rounded hover:bg-blue-700"
              >
                {editProductId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          )}

          {/* Category Form & List */}
          {activeTab === 'category' && (
            <div className="space-y-6">
              <form onSubmit={handleSubmitCategory} className="md:flex md:items-center md:justify-center md:gap-4">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="flex-1 w-full p-3 border border-gray-300 outline-blue-500 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 cursor-pointer rounded hover:bg-green-700 w-full md:w-auto"
                >
                  {editCategoryId ? 'Update Category' : 'Add Category'}
                </button>
              </form>

              {/* Category List */}
              <div className="mt-4">
                {categories.length === 0 ? (
                  <p className="text-center text-gray-500">No categories available.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    <h2 className="text-lg mb-2 font-semibold">Category List</h2>
                    {categories.map((cat) => (
                      <li
                        key={cat._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2"
                      >
                        <span>{cat.name}</span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditCategory(cat)}
                            className="text-blue-600 hover:underline text-sm cursor-pointer flex items-center gap-1"
                          >
                            <Edit3 className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat._id)}
                            className="text-red-600 hover:underline text-sm cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Product List Tab */}
          {activeTab === 'list' && (
            <div className="overflow-x-auto">
              {products.length === 0 ? (
                <p className="text-center text-gray-500">No products available.</p>
              ) : (
                <table className="w-full border border-gray-300 text-sm md:text-base">
                  <thead>
                    <tr className="text-left">
                      <th className="p-3 border-b border-gray-300">Image</th>
                      <th className="p-3 border-b border-gray-300">Name</th>
                      <th className="p-3 border-b border-gray-300">Price</th>
                      <th className="p-3 border-b border-gray-300">Stock</th>
                      <th className="p-3 border-b border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="p-3 border-b border-gray-300">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-3 border-b border-gray-300 font-medium">{product.name}</td>
                        <td className="p-3 border-b border-gray-300">Rs.{product.price}</td>
                        <td className="p-3 border-b border-gray-300">{product.stock}</td>
                        <td className="p-3 border-b border-gray-300 space-y-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:underline text-sm cursor-pointer flex items-center gap-1"
                          >
                            <Edit3 className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:underline text-sm cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
