import { useEffect, useState } from "react";

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
          <li key={Tag.id}>{Tag.label}</li>
        ))}
      </ul>
    </div>
  );
};
