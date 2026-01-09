import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { ApiUrl } from "../Lib/lib";

function Signup() {
    const navigate = useNavigate();
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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          Join us and get started
        </p>

        {message && (
          <p className="text-center text-sm text-green-400 mb-4">
            {message}
          </p>
        )}

     
        {error && (
          <p className="text-center text-sm text-red-400 mb-4">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit} className="space-y-4">
    
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

    
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

 
          <input
            type="text"
            name="mobilenumber"
            placeholder="Mobile Number"
            value={formData.mobilenumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

      
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
           <div className="text-center text-sm text-gray-200">
              Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-300 hover:underline font-medium"
            >
            Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
