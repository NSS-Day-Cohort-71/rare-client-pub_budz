import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../services/tagService";
import "./Tags.css";

export const CreateTag = () => {
  const [label, setLabel] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  const handleSave = async () => {
    await createTag({ label });
    navigate("/tags"); // Redirect to the tags list page after saving
  };

  const handleCancel = () => {
    navigate("/tags"); // Redirect to the tags list page if canceled
  };

  return (
    <div className="create-tag-form">
      <h1>Create Tag</h1>
      <input
        type="text"
        name="label"
        value={label}
        onChange={handleInputChange}
        placeholder="Enter tag name"
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
