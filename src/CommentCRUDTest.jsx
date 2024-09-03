import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../../services/commentService";
import { useEffect } from "react";

export const CommentCRUDTest = () => {
  useEffect(() => {
    const testCRUDOperations = async () => {
      // Test Create
      const newComment = {
        post_id: 1,
        author_id: 1,
        content: "Front-End calling!!!",
      };
      const createdComment = await createComment(newComment);
      console.log("Created Comment:", createdComment);

      // Test Read
      const comments = await getAllComments();
      console.log("All Comments:", comments);

      // Test Update
      //   const updatedComment = {
      //     content: "Updated test comment"
      //   };
      //   const successUpdate = await updateComment(createdComment.id, updatedComment);
      //   console.log("Update Successful:", successUpdate);

      // Test Delete
      //   const successDelete = await deleteComment(createdComment.id);
      //   console.log("Delete Successful:", successDelete);
    };

    testCRUDOperations();
  }, []);

  return (
    <div>
      <h1>Running Comment CRUD Tests</h1>
    </div>
  );
};
