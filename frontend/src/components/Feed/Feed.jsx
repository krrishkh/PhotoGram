import { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found!");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/api/v1/feed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(data);
      } catch (error) {
        console.error("Error fetching feed:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle like function
  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found!");
        return;
      }

      // Optimistically update UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes("currentUserId")
                  ? post.likes.filter((id) => id !== "currentUserId") // Remove like
                  : [...post.likes, "currentUserId"], // Add like
              }
            : post
        )
      );

      // Send like request to backend
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/likePost`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update with backend response for accuracy
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error.response || error.message);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post._id} className="border rounded-lg shadow-lg">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <p className="mt-2 text-lg px-2">{post.content}</p>
          <p className="text-sm text-gray-500 px-2">
            By: {post.author?.fullname || "Unknown"}
          </p>
          <div className="px-2 py-2 flex items-center">
            <button
              onClick={() => handleLike(post._id)}
              className="text-blue-500 hover:text-blue-700"
            >
              ❤️ {post.likes.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
