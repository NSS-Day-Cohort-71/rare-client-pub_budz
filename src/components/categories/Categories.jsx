import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/categoryService";
import { Link, useNavigate } from "react-router-dom";
import "./Categories.css";

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
    <div className="categories-container">
      <h1 className="categories-title">
        <strong>Categories</strong>
      </h1>
      <button
        className="create-category-button"
        onClick={() => navigate("/categories/create")}
      >
        Create Category
      </button>
      <table className="categories-table">
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="actions-cell">
                <Link to={`/categories/edit/${category.id}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(category.id)}>
                  Delete
                </button>
              </td>
              <td>{category.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
