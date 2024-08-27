export const getUserById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};
