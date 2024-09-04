export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const createComment = async (newComment) => {
  try {
    const response = await fetch(`http://localhost:8088/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

export const getAllComments = async () => {
  try {
    const response = await fetch("http://localhost:8088/comments/");
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/comments?post_id=${postId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments for the post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments for the post:", error);
  }
};
