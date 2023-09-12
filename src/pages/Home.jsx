import React from "react";
import Blogs from "./blog/Blogs";
import Footer from "../components/common/Footer";


const Home = () => {


  return (
    <>
      <main className="w-11/12 h-min mt-10 mb-10 mx-auto space-y-5 container">
        <Blogs />
      </main>
      <Footer />
    </>
  );
};

export default Home;
