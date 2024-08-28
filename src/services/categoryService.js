export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/categories/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch("http://localhost:8088/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await fetch(
      `http://localhost:8088/categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      }
    );

    if (response.status === 204) {
      // No content to parse, return null or another value as appropriate
      return null;
    } else if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error so it can be handled elsewhere if needed
  }
};
