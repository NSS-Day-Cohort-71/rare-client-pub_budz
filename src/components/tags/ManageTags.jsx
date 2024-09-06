import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostTags, getAllTags, savePostTags } from '../../services/tagService';

const ManageTags = () => {
  const { postId } = useParams();  // Get postId from route parameters
  const [availableTags, setAvailableTags] = useState([]);  // Store all available tags
  const [selectedTags, setSelectedTags] = useState([]);  // Store tags selected for the post
  const [error, setError] = useState("");  // Store error message

  // Fetch available tags and post-specific tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();  // Fetch all available tags
        setAvailableTags(allTags);

        const postTags = await getPostTags(postId);  // Fetch tags for the post
        setSelectedTags(postTags.map(tag => tag.id));  // Extract tag IDs
      } catch (error) {
        console.error("Error fetching tags:", error);
        setError("Failed to load tags");
      }
    };
    fetchTags();
  }, [postId]);

  // Toggle tag selection (add or remove)
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));  // Deselect the tag
    } else {
      setSelectedTags([...selectedTags, tagId]);  // Select the tag
    }
  };

  // Save the selected tags (create or update tags)
  const handleSaveTags = async () => {
    try {
      await savePostTags(postId, selectedTags);  // Save tags for the post
      alert("Tags saved successfully!");
    } catch (error) {
      setError("Failed to save tags");
    }
  };

  return (
    <div>
      <h1>Manage Tags for Post {postId}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {availableTags.length > 0 ? (
        availableTags.map(tag => (
          <div key={tag.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}  // Check if tag is selected
                onChange={() => toggleTag(tag.id)}  // Toggle tag selection
              />
              {tag.label}
            </label>
          </div>
        ))
      ) : (
        <p>No tags available.</p>
      )}

      <button onClick={handleSaveTags}>Save Tags</button>
    </div>
  );
};

export default ManageTags;
