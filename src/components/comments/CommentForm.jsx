import { useState } from "react";
import { createComment } from "../../services/commentService";

export const CommentForm = ({ postId, onCommentCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id: postId,
      author_id: 1, // Assuming author_id = 1.
      content,
    };

    const createdComment = await createComment(newComment);
    if (createdComment) {
      onCommentCreated(createdComment);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your comment..."
      ></textarea>
      <button type="submit">Add Comment</button>
    </form>
  );
};
