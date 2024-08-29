// tagService.js

export const getAllTags = async () => {
  try {
    const response = await fetch("http://localhost:8088/tags");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getTagById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/tags/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateTag = async (id, tag) => {
  try {
    const response = await fetch(`http://localhost:8088/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
export const deleteTag = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/tags/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return true;
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
};
