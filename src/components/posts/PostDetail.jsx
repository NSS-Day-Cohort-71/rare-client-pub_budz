import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../services/postService';
import { getCommentsByPostId } from "../../services/commentService";
import { getPostTags } from '../../services/tagService'; // Import function to fetch tags
import CommentList from "../comments/CommentList";

const PostDetail = () => {
  const { postId } = useParams(); // Get the postId from the route params
  const [post, setPost] = useState(null); // State to store the post data
  const [author, setAuthor] = useState("Unknown Author"); // State to store the author's name
  const [comments, setComments] = useState([]); // State to store the comments for the post
  const [tags, setTags] = useState([]); // State to store the tags for the post
  const [error, setError] = useState(""); // State to store any error message

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch post details
        const postData = await getPostById(postId);
        setPost(postData);

        // Fetch the author's details based on user_id
        if (postData.user_id) {
          const userResponse = await fetch(
            `http://localhost:8088/users/${postData.user_id}`
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setAuthor(`${userData.first_name} ${userData.last_name}`);
          }
        } else {
          setAuthor("Unknown Author");
        }

        // Fetch comments related to the post
        const postComments = await getCommentsByPostId(postId);
        setComments(postComments);

        // Fetch tags related to the post
        const postTags = await getPostTags(postId); // Fetch the tags for the post
        setTags(postTags); // Store the tags in state
      } catch (error) {
        console.error("Failed to fetch post or comments:", error);
        setError("Failed to load post data");
      }
    };

    fetchPostData();
  }, [postId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        By {author} on {new Date(post.publication_date).toLocaleDateString()}
      </p>
      {post.image_url && <img src={post.image_url} alt="Post Header" />}
      <p>{post.content}</p>

      {/* Display tags associated with the post */}
      <div>
        <h3>Tags:</h3>
        {tags.length > 0 ? (
          <ul>
            {tags.map(tag => (
              <li key={tag.id}>{tag.label}</li> // Assuming tag has id and label
            ))}
          </ul>
        ) : (
          <p>No tags available for this post.</p>
        )}
      </div>

      {/* Link to manage tags */}
      <div>
        <Link to={`/posts/${postId}/tags`}>Manage Tags</Link>
      </div>

      <Link to={`/posts/${postId}/comments/new`}>Add Comment</Link>

      <CommentList comments={comments} />
    </div>
  );
};

export default PostDetail;
