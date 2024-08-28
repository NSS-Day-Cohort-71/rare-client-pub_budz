import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Categories } from "../components/categories/Categories";
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
        </Route>
      </Routes>
    </>
  );
};
