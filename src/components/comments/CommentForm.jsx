import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../services/commentService";

export const CommentForm = () => {
  const { postId } = useParams(); // Get the postId from the route params
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // For redirecting after comment creation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      post_id: postId,
      author_id: 1,
      content,
      created_on: new Date().toISOString(),
    };

    try {
      await createComment(newComment);
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div>
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button type="submit">Save Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
