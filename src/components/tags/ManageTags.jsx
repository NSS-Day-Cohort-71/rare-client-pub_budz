import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { getAllTags } from "../../services/tagService";

export const ManageTags = () => {
  const { postId } = useParams(); // Get the postId from the URL params
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        setTags(allTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        setPost(postData);
        setSelectedTags(postData.tags || []);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchTags();
    fetchPost();
  }, [postId]);

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSaveTags = async () => {
    try {
      const response = await fetch(`http://localhost:8088/posts/${postId}/tags`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag_ids: selectedTags }),
      });

      if (response.ok) {
        alert("Tags updated successfully!");
        navigate(`/posts/${postId}`);
      } else {
        alert("Failed to update tags.");
      }
    } catch (error) {
      console.error("Error updating tags:", error);
    }
  };

  return (
    <div>
      <h1>Manage Tags for {post.title}</h1>
      <div>
        {tags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            <label>{tag.label}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSaveTags}>Save Tags</button>
      <button onClick={() => navigate(`/posts/${postId}`)}>Cancel</button>
    </div>
  );
};
