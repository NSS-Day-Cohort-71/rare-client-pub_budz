import { useEffect, useState } from "react";
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
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} {post.publication_date} {post.approved}
          </li>
        ))}
      </ul>
    </div>
  );
};
