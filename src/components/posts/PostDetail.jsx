import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../services/postService';
import { getTagsByPostId } from '../../services/tagService';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostAndTags = async () => {
      try {
        const postData = await getPostById(postId);
        setPost(postData);

        // Fetch the tags for the post
        const tagData = await getTagsByPostId(postId);
        setTags(tagData);
      } catch (err) {
        setError('Failed to load post or tags');
      }
    };
    fetchPostAndTags();
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
      <p>{post.content}</p>
      <div>
        <h3>Tags:</h3>
        {tags.length > 0 ? (
          <ul>
            {tags.map(tag => (
              <li key={tag.id}>{tag.label}</li>
            ))}
          </ul>
        ) : (
          <p>No tags available</p>
        )}
      </div>
      <Link to={`/posts/${postId}/tags`}>Manage Tags</Link>
    </div>
  );
};

export default PostDetail;
