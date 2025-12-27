import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setMessage("Email and Password are required!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSuccess("");

      const res = await axios.post(
        "http://localhost:3000/login",
        formData
      );

      setSuccess(res.data.message);

   
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

       navigate("/");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {message && (
          <p className="text-center text-sm text-red-500 mb-4">
            {message}
          </p>
        )}

        {success && (
          <p className="text-center text-sm text-green-600 mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
