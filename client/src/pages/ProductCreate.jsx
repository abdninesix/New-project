import { useState, useEffect } from 'react';
import API from '../api/axios';

const ProductCreate = () => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories');  // Assuming you have a /categories endpoint
        setCategories(response.data);  // Set the categories in state
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', Number(formData.price));
      data.append('stock', Number(formData.stock));
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('image', formData.image);

      const res = await API.post('/products', data); // Axios auto handles headers
      alert('✅ Product created successfully!');

      setFormData({ name: '', price: '', stock: '', category: '', description: '', image: null });
      e.target.reset();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Failed to create product.');
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />

        {/* Category Dropdown */}
        <select
          name="category"
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
