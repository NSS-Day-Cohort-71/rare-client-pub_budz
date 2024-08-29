import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts } from "../../services/postService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };
    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const result = await deletePost(postId);
      if (result) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      }
    }
  };

  return (
    <div>
      <h1>
        <strong>Posts</strong>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.publication_date}</td>
              <td>{post.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
