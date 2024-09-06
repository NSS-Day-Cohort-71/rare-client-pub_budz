import { useEffect, useState } from "react";

export const SearchBar = ({ posts, setFilteredPosts }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filterPosts = () => {
      const lowerCaseQuery = query.toLowerCase();

      const filtered = posts.filter((post) => {
        return post.title.toLowerCase().includes(lowerCaseQuery);
      });

      setFilteredPosts(filtered);
    };
    filterPosts();
  }, [query, posts, setFilteredPosts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or tag..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
