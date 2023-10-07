import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from "./components/auth/Profile";
import Error from "./pages/Error";
import SingleBlog from "./pages/blog/SingleBlog";
import Footer from "./components/common/Footer";
import MyBlogs from "./pages/blog/MyBlogs";
import CreateBlog from "./pages/blog/CreateBlog";
import UpdateBlog from "./pages/blog/UpdateBlog";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "./services/opreations/auth";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blogs);
  const blogsData = blog.blogs.blogs;
  const [searchQuery, setSearchQuery] = useState("");

  const searchData =
    blogsData?.length > 0
      ? blogsData?.filter((data) =>
          `${data.title}`
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      : blog;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getAllUserDetails(token, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex overflow-x-hidden flex-col min-h-screen w-full bg-[#0F172A] text-slate-200 ">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchData={searchData} />} />
        <Route path="/blog/:blogId" element={<SingleBlog />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/my-blog"
          element={
            <PrivateRoute>
              <MyBlogs />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/update-blog/:blogId"
          element={
            <PrivateRoute>
              <UpdateBlog />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
