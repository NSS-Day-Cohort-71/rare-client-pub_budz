import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
} from "../../services/categoryService";

export const EditCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({ label: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategory = async () => {
      const categoryData = await getCategoryById(categoryId);
      setCategory(categoryData || { label: "" }); // Ensure the state is always defined
    };
    loadCategory();
  }, [categoryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSave = async () => {
    await updateCategory(categoryId, category);
    navigate("/categories");
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div>
      <h1>Edit Category</h1>
      <input
        type="text"
        name="label"
        value={category.label || ""} // Ensure the value is always a string
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
