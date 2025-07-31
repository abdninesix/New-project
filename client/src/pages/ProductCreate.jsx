import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch products
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

  // Handle input changes for product form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create or Update product
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

  // Create or Update category
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

  // Delete product
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

  // Delete category
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

  // Edit product
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

  // Edit category
  const handleEditCategory = (category) => {
    setEditCategoryId(category._id);
    setCategoryName(category.name);
    setActiveTab('category');
  };

  return (
    <div className='min-h-[70vh] mb-8'>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-md">

        <h1 className="text-3xl font-bold mb-4 mt-4 text-center">Admin Panel</h1>
        
        {/* Tab Switcher */}
        <div className="flex mb-6 border-b">
          <button onClick={() => setActiveTab('product')}
            className={`flex-1 py-2 cursor-pointer ${activeTab === 'product' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}>
            {editProductId ? 'Edit Product' : 'Add Product'}
          </button>
          <button onClick={() => setActiveTab('category')}
            className={`flex-1 py-2 cursor-pointer ${activeTab === 'category' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}>
            {editCategoryId ? 'Edit Category' : 'Add Category'}
          </button>
          <button onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 cursor-pointer ${activeTab === 'list' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}>
            Product List
          </button>
        </div>

        {/* Product Form */}
        {activeTab === 'product' && (
          <form onSubmit={handleSubmitProduct} className="space-y-4">
            <input type="text" name="name" placeholder="Product Name"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              value={formData.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              value={formData.price} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              value={formData.stock} onChange={handleChange} required />

            <select name="category"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>

            <textarea name="description" placeholder="Description"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              value={formData.description} onChange={handleChange} required />

            <input type="file" name="image" accept="image/*"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              onChange={handleChange} />

            {imagePreview && (
              <img src={imagePreview} alt="Preview"
                className="w-32 h-32 object-cover rounded border border-gray-300 mt-2" />
            )}

            <button type="submit"
              className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700">
              {editProductId ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        )}

        {/* Category Form & List */}
        {activeTab === 'category' && (
          <div className="space-y-4">
            <form onSubmit={handleSubmitCategory} className="space-y-4">
              <input type="text" value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
                required />
              <button type="submit"
                className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-700">
                {editCategoryId ? 'Update Category' : 'Add Category'}
              </button>
            </form>

            <div className="mt-6">
              {categories.length === 0 ? (
                <p className="text-center text-gray-500">No categories available.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  <h1 className='text-lg mb-2 font-semibold'>Category List</h1>
                  {categories.map((cat) => (
                    <li key={cat._id} className="flex items-center justify-between py-2">
                      <span>{cat.name}</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditCategory(cat)}
                          className="text-blue-600 hover:underline text-sm cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="text-red-600 hover:underline text-sm cursor-pointer"
                        >
                          Delete
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
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-center text-gray-500">No products available.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name}
                        className="w-16 h-16 object-cover rounded" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:underline text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCreate;
