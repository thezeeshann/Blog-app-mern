import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen w-screen bg-[#0F172A] text-slate-200 ">
      <Navbar />
      <Routes>
        {/* <Route index path="/" element={<Home/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
