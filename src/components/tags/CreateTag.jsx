import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../services/tagService"; // Import the createTag function

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
    <div>
      <h1>Create Tag</h1>
      <input
        type="text"
        name="label"
        value={label}
        onChange={handleInputChange}
        placeholder="Enter tag name"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
