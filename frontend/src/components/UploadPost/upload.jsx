import { useState } from "react";
import axios from "axios";

const UploadPost = ({ }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(""); // Reset URL if user uploads a file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return alert("Content is required!");
  
    setLoading(true);
    try {
      let postData;
  
      if (image) {
        postData = new FormData();
        postData.append("content", content);
        postData.append("image", image);
      } else if (imageUrl) {
        postData = { content, imageUrl };
      } else {
        return alert("Please provide an image or URL!");
      }
  
      console.log("Sending Data: ", postData);
  
      const response = await axios.post(
        "http://localhost:5000/api/v1/upload",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": image ? "multipart/form-data" : "application/json",
          },
        }
      );
  
      // addNewPost(response.data.data);
  
      setContent("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error uploading post:", error.response);
      alert(`Error uploading post: ${error.response?.data?.message || error}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <p className="text-center">OR</p>

        <input
          type="text"
          placeholder="Paste Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
