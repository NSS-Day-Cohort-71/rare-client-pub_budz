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

export const createTag = async (tag) => {
  try {
    const response = await fetch("http://localhost:8088/tags", {
      method: "POST",
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
    throw error;
  }
};

// New Functions to Add

// Fetch tags associated with a specific post
export const getTagsByPostId = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8088/posts/${postId}/tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch tags for the post.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Save tags for a specific post
export const savePostTags = async (postId, tagIds) => {
  try {
    const response = await fetch(`http://localhost:8088/posts/${postId}/tags`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag_ids: tagIds }), // Make sure it's 'tag_ids'
    });
    if (!response.ok) {
      throw new Error("Failed to save tags for the post.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

