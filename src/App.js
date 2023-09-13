import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
// import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import SignleBlog from "./pages/blog/SignleBlog";
import "./App.css";

function App() {
  return (
    <div className="flex overflow-x-hidden flex-col min-h-screen w-full bg-[#0F172A] text-slate-200 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<SignleBlog/>} />

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
       
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        } />
        <Route path="*" element={<Error/>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
