import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsByPostId,
  deleteComment,
} from "../../services/commentService";

export const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const postComments = await getCommentsByPostId(postId);
      setComments(postComments);
    };

    fetchComments();

    fetch(`http://localhost:8088/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPostTitle(data.title))
      .catch((error) => console.error("Error fetching post title:", error));
  }, [postId]);

  // Function to handle comment deletion
  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      await deleteComment(commentId);
      // After deletion, fetch the updated list of comments
      const updatedComments = await getCommentsByPostId(postId);
      setComments(updatedComments);
    }
  };

  return (
    <div>
      <h2>Comments for: {postTitle}</h2>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.author}</strong> (
                {new Date(comment.created_on).toLocaleDateString()}):
              </p>
              <p>{comment.content}</p>
              {/* Delete button for each comment */}
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
