import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CommentList = ({ comments: initialComments = [] }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState(initialComments);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    if (!initialComments.length) {
      fetch(`http://localhost:8088/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched comments data:", data);
          if (Array.isArray(data)) {
            // Case where API directly returns comments array
            setComments(data);
          } else if (data.comments && Array.isArray(data.comments)) {
            // Case where comments are inside the post object
            setComments(data.comments);
          } else {
            console.error("API did not return an array for comments.");
          }
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }

    fetch(`http://localhost:8088/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPostTitle(data.title))
      .catch((error) => console.error("Error fetching post title:", error));
  }, [postId, initialComments]);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
