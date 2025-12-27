import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobilenumber: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(`${ApiUrl}/signup`, formData);

      if (res.data.success) {
        setMessage(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          mobilenumber: "",
          country: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="mobilenumber"
            placeholder="Mobile Number"
            value={formData.mobilenumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
