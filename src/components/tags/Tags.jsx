import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTags, deleteTag } from "../../services/tagService";
import "./Tags.css"

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
    <div className="tags-container">
      <h1 className="tags-title"><strong>Tags</strong></h1>
      <Link to="/tags/create" className="create-tag-button">Create New Tag</Link>
      <table className="tags-table">
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="actions-cell">
                <Link to={`/tags/edit/${tag.id}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(tag.id)}>Delete</button>
              </td>
              <td>{tag.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

