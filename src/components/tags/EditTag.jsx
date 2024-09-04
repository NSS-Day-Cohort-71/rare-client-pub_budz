import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllTags, getTagsForPost, updatePostTags } from "../../services/tagService"; // Assume these services exist

export const EditTag = () => {
  const { postId } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); 
  const [availableTags, setAvailableTags] = useState([]); // All available tags
  const [selectedTags, setSelectedTags] = useState([]); // Tags selected for the post

  // Fetch all tags and the tags associated with the current post
  useEffect(() => {
    const loadTags = async () => {
      const allTags = await getAllTags();
      const postTags = await getTagsForPost(postId); // Fetch tags for this post
      setAvailableTags(allTags);
      setSelectedTags(postTags.map(tag => tag.id)); // Store only the IDs of the tags
    };
    loadTags();
  }, [postId]);

  // Handle checkbox change when user selects/deselects a tag
  const handleCheckboxChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId)); // Deselect tag
    } else {
      setSelectedTags([...selectedTags, tagId]); // Select tag
    }
  };

  // Save the selected tags for the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePostTags(postId, selectedTags); // Update tags in the database
    navigate(`/posts/${postId}`); // Redirect back to post details
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`); // Redirect to post details page
  };

  return (
    <div>
      <h1>Manage Tags for Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {availableTags.map(tag => (
            <div key={tag.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleCheckboxChange(tag.id)}
                />
                {tag.label}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};
