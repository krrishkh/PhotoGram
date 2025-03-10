import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("http://localhost:5000/api/v1/login", formData);
      console.log("data", data.data.refreshToken)
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // Redirect to intended page or home if not provided
      const redirectTo = location.state?.redirectTo || "/";
      navigate(redirectTo);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Username:</label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-500 underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
