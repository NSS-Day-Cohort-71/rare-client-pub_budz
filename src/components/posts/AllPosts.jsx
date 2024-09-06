import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts } from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";
import { CategoryDropdown } from "../categories/CategoryDropdown";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch posts
  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
      setFilteredPosts(postsData); // Initialize filteredPosts with all posts
    };
    loadPosts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  // Filter posts by selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(
        posts.filter((post) => post.category === selectedCategory)
      );
    } else {
      setFilteredPosts(posts); // If no category is selected, show all posts
    }
  }, [selectedCategory, posts]);

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

      <div>
        <Link to="/posts/new">
          <button>Add Post</button>
        </Link>
      </div>

      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <table>
        <thead>
          <tr>
            <th>{""}</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
              <td>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
                {/* Make the title clickable */}
              </td>
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
