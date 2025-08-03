import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        My Profile
      </h1>

      <div className="grid grid-cols-3 gap-4 items-center text-gray-700">
        {/* Role */}
        <label className="font-semibold col-span-1">Role:</label>
        <div className="col-span-2">
          <span
            className={`px-2 py-1 rounded text-white ${
              user.role === "admin" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {user.role}
          </span>
        </div>

        {/* Name */}
        <label className="font-semibold col-span-1">Name:</label>
        <div className="col-span-2">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        {/* Email */}
        <label className="font-semibold col-span-1">Email:</label>
        <div className="col-span-2">
          {editMode ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        {/* Password */}
        {editMode && (
          <>
            <label className="font-semibold col-span-1">New Password:</label>
            <div className="col-span-2">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Leave empty to keep current password"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
