import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import Footer from "./components/common/Footer";
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import "./App.css";

function App() {
  return (
    <div className="flex overflow-x-hidden flex-col min-h-screen w-full bg-[#0F172A] text-slate-200 ">
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home/>} />
        <Route index path="/login" element={<Login/>} />
        <Route index path="/signup" element={<Signup/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
