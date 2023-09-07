import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
<<<<<<< HEAD
import Footer from "./components/common/Footer";
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
=======
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9
import "./App.css";

function App() {
  return (
<<<<<<< HEAD
    <div className="flex overflow-x-hidden flex-col min-h-screen w-full bg-[#0F172A] text-slate-200 ">
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home/>} />
        <Route index path="/login" element={<Login/>} />
        <Route index path="/signup" element={<Signup/>} />
      </Routes>
      <Footer/>
=======
    <div className="flex min-h-screen w-screen bg-[#0F172A] text-slate-200 ">
      <Navbar />
      <Routes>
        {/* <Route index path="/" element={<Home/>} /> */}
      </Routes>
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9
    </div>
  );
}

export default App;
