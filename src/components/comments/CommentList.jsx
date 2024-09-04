import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../services/commentService"; // Import your service

export const CommentList = ({ comments: initialComments = [] }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState(initialComments);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    // Fetch comments by postId
    if (!initialComments.length) {
      getCommentsByPostId(postId)
        .then((data) => {
          console.log("Fetched comments data:", data);
          // Check if data is an array of comments
          if (Array.isArray(data)) {
            setComments(data);
          } else {
            console.error("API did not return an array for comments.");
          }
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }

    // Fetch post title
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
                <strong>{comment.author_id}</strong>{" "}
                {/* Change author_id to display name */}(
                {comment.created_on
                  ? new Date(comment.created_on).toLocaleDateString()
                  : "Unknown Date"}
                ):
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
