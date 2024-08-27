import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";

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
      <h1><strong>Categories</strong></h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.label}</li>
        ))}
      </ul>
    </div>
  );
};
