export const CategoryDropdown = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">Select a Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.label}>
          {category.label}
        </option>
      ))}
    </select>
  );
};
