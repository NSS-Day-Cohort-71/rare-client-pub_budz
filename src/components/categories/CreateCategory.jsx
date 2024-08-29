import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";

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
    <div>
      <h1>Create Category</h1>
      <input
        type="text"
        name="label"
        value={label}
        onChange={handleInputChange}
        placeholder="Enter category name"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
