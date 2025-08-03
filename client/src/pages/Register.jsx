import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", formData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
