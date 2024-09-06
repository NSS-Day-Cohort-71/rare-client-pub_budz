import { useEffect, useState } from "react";
import { createPost } from "../../services/postService";
import { PostForm } from "./PostForm";
import { getAllCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";

export const NewPost = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleSave = async (formData) => {
    try {
      // Retrieve the user ID from local storage
      const user_id = JSON.parse(localStorage.getItem("auth_token"));

      // Include the user_id in the formData
      const postData = {
        ...formData,
        user_id,
      };

      await createPost(postData);
      navigate("/posts");
    } catch (error) {
      setError("Failed to create post");
    }
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  const defaultPost = {
    title: "",
    image_url: "",
    content: "",
    category_id: "",
  };

  return (
    <div>
      <h1>
        <strong>
          <center>New Post</center>
        </strong>
      </h1>
      <PostForm
        post={defaultPost}
        categories={categories}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};
