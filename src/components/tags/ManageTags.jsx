import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostTags, getAllTags, savePostTags, deletePostTag } from '../../services/tagService'; // Import deletePostTag

const ManageTags = () => {
  const { postId } = useParams();  // Get postId from route parameters
  const navigate = useNavigate();  // Initialize useNavigate to handle navigation
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

  // Save the selected tags (POST)
  const handleSaveTags = async () => {
    try {
      await savePostTags(postId, selectedTags);  // Save tags for the post
      alert("Tags saved successfully!");
      navigate(`/posts/${postId}`);  // Navigate back to post details after saving
    } catch (error) {
      setError("Failed to save tags");
    }
  };

  // Delete the unselected tags
  const handleDeleteTags = async () => {
    try {
      const unselectedTags = availableTags.filter(tag => !selectedTags.includes(tag.id));
      
      // Loop through unselected tags and delete them from the post
      for (const tag of unselectedTags) {
        await deletePostTag(postId, tag.id);
      }

      alert("Tags deleted successfully!");
      navigate(`/posts/${postId}`);  // Navigate back to post details after deletion
    } catch (error) {
      setError("Failed to delete tags");
    }
  };

  // Cancel the operation and go back to the post detail page
  const handleCancel = () => {
    navigate(`/posts/${postId}`);  // Navigate back to post details
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
      <button onClick={handleDeleteTags}>Delete Unchecked Tags</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ManageTags;
