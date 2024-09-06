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
export const getPostTags = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8088/posttags?post_id=${postId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch tags for the post. Server responded with: ${errorText}`);
    }
    return await response.json();  // This should return an array of tags for the post
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};


// tagService.js

// Save (add) tags to a specific post
export const savePostTags = async (postId, tagIds) => {
  try {
    const response = await fetch(`http://localhost:8088/posttags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        tag_ids: tagIds
      })  // Send the list of tag IDs
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server: ${errorText}`);
      throw new Error("Failed to save tags for the post.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Update tags for a specific post
export const updatePostTags = async (postId, tagIds) => {
  try {
    const response = await fetch(`http://localhost:8088/posttags`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        tag_ids: tagIds
      })  // Send the new list of tag IDs
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server: ${errorText}`);
      throw new Error("Failed to update tags for the post.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Delete a specific tag from a post
export const deletePostTag = async (tagId) => {
  try {
    const response = await fetch(`http://localhost:8088/posttags/${tagId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server: ${errorText}`);
      throw new Error("Failed to delete tag from the post.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
