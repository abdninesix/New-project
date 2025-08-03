import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", formData);
      toast.success("Login successful!");

      // Save token and user to localStorage
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("userChange"));
      } else {
        localStorage.removeItem("user");
      }

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Login
        </button>
        <p>Don't have an account?<Link to="/register" className="text-blue-500"> Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
