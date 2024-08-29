import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Categories } from "../components/categories/Categories";
import { Tags } from "../components/tags/tags";
import { EditTag } from "../components/tags/EditTag"; 
import { AllPosts } from "../components/posts/AllPosts";
import { EditPost } from "../components/posts/EditPost";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="posts" element={<AllPosts />} />
          <Route path="posts/:postId/edit" element={<EditPost />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} /> 
          <Route path="tags/edit/:id" element={<EditTag />} /> 
        </Route>
      </Routes>
    </>
  );
};
