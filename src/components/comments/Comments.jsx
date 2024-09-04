import { useEffect, useState } from "react";
import { deleteComment, getAllComments } from "../../services/commentService";

export const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const commentsData = await getAllComments();
      setComments(commentsData);
    };
    loadComments();
  }, []);

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <div>
      <h1>
        <strong>All Comments</strong>
      </h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              <strong>{comment.author || "Anonymous"}</strong>:{" "}
              {comment.content}
            </p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
