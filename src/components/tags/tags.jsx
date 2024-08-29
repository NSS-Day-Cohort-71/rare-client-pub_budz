import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTags, deleteTag } from "../../services/tagService";

export const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadTags = async () => {
      const tagsData = await getAllTags();
      setTags(tagsData);
    };
    loadTags();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
    
    if (confirmDelete) {
      const isDeleted = await deleteTag(id);
      if (isDeleted) {
        setTags(tags.filter(tag => tag.id !== id)); // Remove the deleted tag from the state
      }
    }
  };

  return (
    <div>
      <h1><strong>Tags</strong></h1>
      <Link to="/tags/create">Create New Tag</Link> {/* Add this link */}
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.label}{" "}
            <Link to={`/tags/edit/${tag.id}`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(tag.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
