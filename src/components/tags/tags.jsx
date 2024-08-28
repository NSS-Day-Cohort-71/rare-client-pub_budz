import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { getAllTags } from "../../services/tagService";

export const Tags = () => {
  const [Tags, setTags] = useState([]);

  useEffect(() => {
    const loadTags = async () => {
      const TagsData = await getAllTags();
      setTags(TagsData);
    };
    loadTags();
  }, []);

  return (
    <div>
      <h1><strong>Tags</strong></h1>
      <ul>
        {Tags.map((Tag) => (
          <li key={Tag.id}>
            {Tag.label}
            {" "}
            <Link to={`/tags/edit/${Tag.id}`}>Edit</Link> {/* Add Edit Link */}
          </li>
        ))}
      </ul>
    </div>
  );
};
