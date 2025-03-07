import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Welcome to Photogram 📸</h1>

      <div className="space-x-6">
        <Link
          to="/register"
          className="px-6 py-3 rounded-2xl bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 transition"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 rounded-2xl bg-green-500 text-white text-lg font-semibold hover:bg-green-600 transition"
        >
          Login
        </Link>

        <Link
          to="/feed"
          className="px-6 py-3 rounded-2xl bg-purple-500 text-white text-lg font-semibold hover:bg-purple-600 transition"
        >
          Feed
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
