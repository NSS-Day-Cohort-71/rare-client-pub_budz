export const getAllPosts = async () => {
  try {
    const response = await fetch(`http://localhost:8088/posts`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const posts = await response.json();
    return posts.filter((post) => !post.is_deleted); // Filter out soft-deleted posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostById = async (postId) => {
  try {
    const res = await fetch(`http://localhost:8088/posts/${postId}`);
    if (!res.ok) {
      throw new Error(`Error fetching post: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updatePost = async (postId, updatedPost) => {
  try {
    const res = await fetch(`http://localhost:8088/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (res.status === 204) {
      return {};
    }

    if (!res.ok) {
      throw new Error(`Error updating post: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }
    return response.ok;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const createPost = async (post) => {
  try {
    const res = await fetch(`http://localhost:8088/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getMyPosts = async () => {
  const userId = localStorage.getItem('userId'); // Ensure the userId is correctly stored
  try {
    const response = await fetch(`http://localhost:8088/posts?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};

