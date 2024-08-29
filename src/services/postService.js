export const getAllPosts = async () => {
  try {
    const response = await fetch(`http://localhost:8088/posts`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
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

// export const updatePost = async (postId, updatedPost) => {
//   try {
//     const res = await fetch(`http://localhost:8088/posts/${postId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedPost),
//     });

//     if (res.status === 204) {
//       return {};
//     }

//     if (!res.ok) {
//       throw new Error(`Error updating post: ${res.statusText}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// };
export const updatePost = async (postId, updatedPost) => {
  console.log('Updating post with ID:', postId);
  console.log('Post data:', updatedPost);
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
};
