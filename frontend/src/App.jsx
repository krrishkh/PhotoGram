import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register/Register";
import HomePage from "./components/Homepage/Homepage";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import UploadPost from "./components/UploadPost/upload";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("accessToken"); // Check if user is logged in

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  // Navigate to login page if not authenticated
  const handleProtectedRoute = (path) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: path } });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1
          className="text-5xl font-extrabold tracking-tight mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          PhotoGram
        </h1>

        {window.location.pathname === "/" && (
          <div className="flex gap-6 mt-8">
            <button
              onClick={() => handleProtectedRoute("/upload")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-lg"
            >
              Upload
            </button>
            <button
              onClick={() => handleProtectedRoute("/feed")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg text-lg"
            >
              Explore
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
