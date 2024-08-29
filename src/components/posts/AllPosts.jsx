import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/postService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };
    loadPosts();
  }, []);

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
