import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/categoryService";
import { Link, useNavigate } from "react-router-dom";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      await deleteCategory(categoryId);
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    }
  };

  return (
    <div>
      <h1>
        <strong>Categories</strong>
      </h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.label}
            <Link to={`/categories/edit/${category.id}`}>Edit</Link>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
