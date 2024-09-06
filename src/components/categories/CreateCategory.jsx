import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";
import "./Categories.css";

export const CreateCategory = () => {
  const [label, setLabel] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  const handleSave = async () => {
    await createCategory({ label });
    navigate("/categories"); // Redirect to the categories list page after saving
  };

  const handleCancel = () => {
    navigate("/categories"); // Redirect to the categories list page if canceled
  };

  return (
    <div className="create-category-form">
      <h1>Create Category</h1>
      <input
        type="text"
        name="label"
        value={label}
        onChange={handleInputChange}
        placeholder="Enter category name"
        className="form-input"
      />
      <div className="form-actions">
        <button onClick={handleSave} className="form-button">
          Save
        </button>
        <button onClick={handleCancel} className="form-button">
          Cancel
        </button>
      </div>
    </div>
  );
};
