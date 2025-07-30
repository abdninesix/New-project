import { useState, useEffect } from 'react';
import API from '../api/axios';

const ProductCreate = () => {
  const [activeTab, setActiveTab] = useState('product'); // "product" or "category"

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

  // Fetch categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
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

  // Handle product creation
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, key === 'price' || key === 'stock' ? Number(value) : value);
      });

      await API.post('/products', data);
      alert('✅ Product created successfully!');

      setFormData({ name: '', price: '', stock: '', category: '', description: '', image: null });
      setImagePreview(null);
      e.target.reset();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Failed to create product.');
    }
  };

  // Handle category creation
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      await API.post('/categories', { name: categoryName });
      alert('✅ Category created successfully!');
      setCategoryName('');
      // Refresh category list
      const response = await API.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Failed to create category.');
    }
  };

  return (
    <div className='h-[70vh]'>
      <div className="max-w-2xl mx-auto mt-8 mb-8 p-6 bg-white rounded shadow-md">
        {/* Tab Switcher */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab('product')}
            className={`flex-1 py-2 ${activeTab === 'product' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`flex-1 py-2 ${activeTab === 'category' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Add Category
          </button>
        </div>

        {/* Product Form */}
        {activeTab === 'product' && (
          <form onSubmit={handleSubmitProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              onChange={handleChange}
              required
            />

            {/* Category Dropdown */}
            <select
              name="category"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
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
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full"
              onChange={handleChange}
              required
            />

            {/* Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border border-gray-300 outline-blue-500 mt-2"
              />
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Product
            </button>
          </form>
        )}

        {/* Category Form */}
        {activeTab === 'category' && (
          <form onSubmit={handleSubmitCategory} className="space-y-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
              className="w-full p-2 border border-gray-300 outline-blue-500 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Category
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductCreate;
