import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";

export const EditPost = () => {
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostAndCategories = async () => {
      const postData = await getPostById(postId);
      setPost(postData);
      setTitle(postData.title || "");
      setImageUrl(postData.image_url || "");
      setContent(postData.content || "");
      setSelectedCategory(postData.category || "");

      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };

    fetchPostAndCategories();
  }, [postId]);

  const handleSave = async () => {
    const updatedPost = {
      title,
      content,
      category: selectedCategory,
      image_url: imageUrl,
    };

    const result = await updatePost(postId, updatedPost);

    if (result) {
      navigate("/posts");
    } else {
      // Handle error (e.g., show a notification)
    }
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {post ? (
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
