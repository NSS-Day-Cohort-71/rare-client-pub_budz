import { CommentForm } from "../comments/CommentForm";
import { CommentList } from "../comments/CommentList";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { useState, useEffect } from "react";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const postData = await getPostById(postId);
      setPost(postData);
    };
    loadPost();
  }, [postId]);

  const handleCommentCreated = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments
        ? [...prevPost.comments, newComment]
        : [newComment],
    }));
  };

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <CommentForm
            postId={postId}
            onCommentCreated={handleCommentCreated}
          />
          <CommentList comments={post.comments || []} postId={postId} />
        </>
      )}
    </div>
  );
};
