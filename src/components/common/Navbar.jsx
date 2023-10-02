import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "../auth/ProfileDropdown";

import Search from "./Search";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <header className="lg:w-11/12 md:w-10/12 sm:w-9/12 h-min container mx-auto pt-5 ">
      <nav className="flex flex-row justify-between items-center">
        <p className="lg:text-2xl md:text-xl sm:text-lg font-bold cursor-pointer uppercase">
          <Link to="/">The Daily Blog</Link>
        </p>

        <Search />

        <ul className="flex gap-x-3 cursor-pointer font-semibold">
          {token === null && (
            <li className="hover:text-sky-500">
              <Link to="/login">Login</Link>
            </li>
          )}
          {token === null && (
            <li className="hover:text-sky-500">
              <Link to="/signup">Sign Up</Link>{" "}
            </li>
          )}
           {token !== null && (
            <ProfileDropdown/>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
