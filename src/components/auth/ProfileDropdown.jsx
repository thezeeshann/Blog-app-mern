import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { BiNote } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/opreations/auth";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  if(!user){
    return null
  }

  return (
    <button className="relative w-full" onClick={() => setOpen(true)}>
      <div className="shadow-md bg-bgColorTwo flex flex-row gap-x-1 py-2 px-5 rounded-full ">
        <div>
          <BiUserCircle className="text-lg" />
        </div>
        <p className="text-sm font-semibold capitalize">{user?.firstName || "user"}</p>
      </div>

      {open && (
        <div ref={ref} className="border-[2px] border-slate-300 flex flex-col gap-y-1 absolute top-[110%] bg-bgColorTwo right-0 left-0 z-[1000] w-full rounded-md py-2 px-2">
          <Link to="/profile/my-blog" onClick={()=>setOpen(false)} className="flex flex-row gap-x-2 hover:bg-[#0F172A] rounded-md py-0.5 ">
            <BiNote className="text-lg text-white" />
            <p className="text-[12px]">MyBlogs</p>
          </Link>
          <Link to="/profile/create-blog" className="flex flex-row gap-x-2  hover:bg-[#0F172A] rounded-md py-0.5 ">
            <IoIosCreate className="text-lg" />
            <p className="text-[12px]">Upload</p>
          </Link>
          <div onClick={()=>{
            dispatch(logout(navigate))
            setOpen(false)
          }} className="flex flex-row gap-x-2  hover:bg-[#0F172A] rounded-md py-0.5 ">
            <BiLogOut className="text-lg" />
            <p className="text-[12px]">Logout</p>
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
