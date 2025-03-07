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
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {posts.map((post) => (
      <div key={post._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        
        {/* Image Section */}
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Post Content */}
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800">{post.content}</div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500  align-middle">
                Posted By: {post.author?.fullname || "Unknown"}
              </div>

              {/* Like Button */}
              <div className="flex gap-3"> 
                <button
                onClick={() => handleLike(post._id)}
                className=" text-blue-600 hover:text-blue-800 transition-colors"
                >
                ❤️Like 
                </button>
                <div className="text-black">{post.likes.length}</div>
                
              </div>
          </div>
        </div>

      </div>
    ))}
  </div>
  );
};

export default Feed;
