import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Categories } from "../components/categories/Categories";
import { Tags } from "../components/tags/tags";
import { EditCategory } from "../components/categories/EditCategory.jsx";
import { EditTag } from "../components/tags/EditTag"; // Import the EditTag component
import { AllPosts } from "../components/posts/AllPosts";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="posts" element={<AllPosts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} />{" "}
          {/* Ensure this is lowercase to match the rest */}
          <Route path="tags/edit/:id" element={<EditTag />} />{" "}
          {/* Add the EditTag route */}
        </Route>
      </Routes>
    </>
  );
};
