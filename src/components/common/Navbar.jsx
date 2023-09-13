import React from "react";
import {Link, useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { logout } from "../../services/opreations/auth";

const Navbar = () => {

  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <header className="w-11/12 h-min container mx-auto pt-5 ">
      <nav className="flex flex-row justify-between items-center">
        <p className="text-2xl font-bold cursor-pointer uppercase"><Link to="/">The Daily Blog</Link></p>

        <div className="max-w-md mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#1E293B] overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-slate-200 pr-2 bg-[#1E293B]"
              type="search"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>

        <ul className="flex gap-x-3 cursor-pointer font-semibold">
          {
            token === null  && (
              <li className="hover:text-sky-500"><Link to="/login">Login</Link></li>
            )
          }
          {
            token === null && (
              <li className="hover:text-sky-500"><Link to="/signup">Sign Up</Link> </li>
            )
          }
          {
            token !== null && (
              <li><Link>welcome</Link></li>
            )
          }
          {
            token !== null && (
              <Link onClick={()=>dispatch(logout(navigate))}>Logout</Link>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
