import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/postService';

const PostDetail = () => {
  const { postId } = useParams(); // Get the postId from the route params
  const [post, setPost] = useState(null); // State to store the post data
  const [author, setAuthor] = useState('Unknown Author'); // State to store the author's name
  const [error, setError] = useState(''); // State to store any error message

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        if (postData) {
          setPost(postData);

          // Fetch the user details based on user_id
          if (postData.user_id) {
            try {
              const userResponse = await fetch(`http://localhost:8088/users/${postData.user_id}`);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                setAuthor(`${userData.first_name} ${userData.last_name}`);
              } else {
                console.error('User not found');
                setAuthor('Unknown Author');
              }
            } catch (error) {
              console.error('Failed to fetch user details:', error);
              setAuthor('Unknown Author');
            }
          }
        } else {
          setError('Post not found');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setError('Failed to load post data');
      }
    };

    fetchPost();
  }, [postId]); // Dependency array with postId ensures it runs when postId changes

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {author} on {new Date(post.publication_date).toLocaleDateString()}</p>
      {post.image_url && <img src={post.image_url} alt="Post Header" />}
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
