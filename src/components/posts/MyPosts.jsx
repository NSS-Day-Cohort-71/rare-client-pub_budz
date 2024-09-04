import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyPosts } from '../../services/postService';

export const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const myPostsData = await getMyPosts();
        console.log(myPostsData); // Log the posts data to verify
        setPosts(myPostsData);
      } catch (err) {
        setError('Failed to load posts');
      }
    };
    loadPosts();
  }, []); // Only run on component mount

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:8088/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } else {
          alert('Failed to delete the post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handlePublish = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8088/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approved: true, // Setting approved to true to publish the post
        }),
      });
  
      if (response.ok) {
        // Successfully published, refresh the posts list
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, approved: true } : post
          )
        );
      } else {
        alert('Failed to publish the post');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };
  
  const handleUnpublish = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8088/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approved: false, // Setting approved to false to unpublish the post
        }),
      });
  
      if (response.ok) {
        // Successfully unpublished, refresh the posts list
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, approved: false } : post
          )
        );
      } else {
        alert('Failed to unpublish the post');
      }
    } catch (error) {
      console.error('Error unpublishing post:', error);
    }
  };
  

  return (
    <div>
      <h1>My Posts</h1>
      {error && <p>{error}</p>}
      {posts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>
                  <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                  {post.approved ? (
                    <button onClick={() => handleUnpublish(post.id)}>Unpublish</button>
                  ) : (
                    <button onClick={() => handlePublish(post.id)}>Publish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};
