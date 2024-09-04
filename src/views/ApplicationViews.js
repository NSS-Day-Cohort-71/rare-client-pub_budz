import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Categories } from "../components/categories/Categories";
import { Tags } from "../components/tags/tags";
import { EditCategory } from "../components/categories/EditCategory";
import { EditTag } from "../components/tags/EditTag";
import { AllPosts } from "../components/posts/AllPosts";
import { EditPost } from "../components/posts/EditPost";
import { CreateCategory } from "../components/categories/CreateCategory";
import { CreateTag } from "../components/tags/CreateTag";
import { NewPost } from "../components/posts/NewPost";
import PostDetail from "../components/posts/PostDetail";
import { MyPosts } from '../components/posts/MyPosts';





export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="posts" element={<AllPosts />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/:postId/edit" element={<EditPost />} />
          <Route path="posts/:postId" element={<PostDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/categories/edit/:categoryId" element={<EditCategory />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="tags" element={<Tags />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="tags/edit/:id" element={<EditTag />} />
          <Route path="tags/create" element={<CreateTag />} />
        </Route>
      </Routes>
    </>
  );
};
