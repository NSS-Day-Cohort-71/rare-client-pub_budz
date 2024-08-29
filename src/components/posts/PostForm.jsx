import React, { useState, useEffect } from "react";

export const PostForm = ({ post = {}, categories = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post.title || "",
    image_url: post.image_url || "",
    content: post.content || "",
    category_id: post.category_id || "",
  });

  useEffect(() => {
    setFormData({
      title: post.title || "",
      image_url: post.image_url || "",
      content: post.content || "",
      category_id: post.category_id || "",
    });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
