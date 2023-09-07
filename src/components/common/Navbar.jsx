import React from "react";
<<<<<<< HEAD
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <header className="w-11/12 h-min container mx-auto pt-5 ">
      <nav className="flex flex-row justify-between items-center">
        <p className="text-2xl font-bold cursor-pointer uppercase"><Link to="/">The Daily Blog</Link></p>
=======

const Navbar = () => {
  return (
    <header className="w-full h-min px-10 pt-5">
      <nav className="flex flex-row justify-between items-center">
        <p className="text-3xl font-bold cursor-pointer">Blog</p>
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9

        <div class="max-w-md mx-auto">
          <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#1E293B] overflow-hidden">
            <div class="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              class="peer h-full w-full outline-none text-sm text-slate-200 pr-2 bg-[#1E293B]"
              type="search"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>

        <ul className="flex gap-x-3 cursor-pointer font-semibold">
<<<<<<< HEAD
          <li className="hover:text-sky-500"><Link to="/login">Login</Link></li>
          <li className="hover:text-sky-500"><Link to="/signup">Sign Up</Link> </li>
=======
          <li className="hover:text-sky-500">Login</li>
          <li className="hover:text-sky-500">Register</li>
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
