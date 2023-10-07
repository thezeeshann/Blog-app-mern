import React from "react";
import Blogs from "./blog/Blogs";

const Home = ({searchData}) => {
  return (
    <>
      <main className="lg:w-11/12 md:w-10/12 sm:w-9/12 h-min mt-10 mb-10 mx-auto space-y-5 container">
        <Blogs searchData={searchData} />
      </main>
    </>
  );
};

export default Home;
