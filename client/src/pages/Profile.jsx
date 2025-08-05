import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Lock, LogOut, Edit3, Save, X } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setForm({ name: parsed.name, email: parsed.email, password: "" });
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await API.put(`/users/${user._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = { ...user, ...res.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Update failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
    toast.info("Logged out successfully!");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F7FAFC] p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl border border-gray-200 p-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl shadow-md">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h1>
          <span
            className={`mt-1 px-3 py-1 text-xs font-medium rounded-full ${
              user.role === "admin" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {user.role === "admin" ? "Administrator" : "User"}
          </span>
        </div>

        {/* Info Grid */}
        <div className="space-y-4 text-gray-700">
          {/* Name */}
          <div className="flex items-center gap-3">
            <User className="text-gray-400 w-5 h-5" />
            {editMode ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="flex-1 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ) : (
              <span className="flex-1">{user.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-gray-400 w-5 h-5" />
            {editMode ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ) : (
              <span className="flex-1">{user.email}</span>
            )}
          </div>

          {/* Password */}
          {editMode && (
            <div className="flex items-center gap-3">
              <Lock className="text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="New password (optional)"
                className="flex-1 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
