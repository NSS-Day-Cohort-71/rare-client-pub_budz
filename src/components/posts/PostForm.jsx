import React, { useState, useEffect } from "react";
import "./Posts.css"

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
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="form-button">Save</button>
        <button type="button" onClick={onCancel} className="form-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

