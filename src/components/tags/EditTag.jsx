import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import { getTagById, updateTag } from "../../services/tagService";

export const EditTag = () => {
  const { id } = useParams(); // Get the tag ID from the URL
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [tag, setTag] = useState({ label: "" });

  useEffect(() => {
    const loadTag = async () => {
      const tagData = await getTagById(id);
      setTag(tagData);
    };
    loadTag();
  }, [id]);

  const handleChange = (e) => {
    setTag({ ...tag, label: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTag(id, tag);
    navigate("/tags"); // Use navigate to redirect to the tag list
  };

  const handleCancel = () => {
    navigate("/tags"); // Use navigate to redirect to the tag list
  };

  return (
    <div>
      <h1>Edit Tag</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Label:
          <input type="text" value={tag.label} onChange={handleChange} required />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};
