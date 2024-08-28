import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

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
          </li>
        ))}
      </ul>
    </div>
  );
};
