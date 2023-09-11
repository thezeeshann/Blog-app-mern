import React,{useEffect} from 'react'
import image from "../../assets/javascript.webp";
import { getAllBlogs } from "../../redux/slices/opreations/blog";
import {useDispatch,useSelector} from "react-redux"


const Blogs = () => {

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs)

  useEffect(()=>{
    dispatch(getAllBlogs())
  },[dispatch])


  return (
    <div className="flex flex-row bg-slate-800 px-3 py-3 rounded-md">
        <div className="w-4/12 cursor-pointer">
          <img src={image} className="w-11/12 h-full" alt="" />
        </div>
        <div className="w-8/12 flex flex-col gap-y-5">
          <div>
            <p className="font-bold text-2xl">
              Lipsum generator: Lorem Ipsum - All the facts
            </p>
            <div className="flex flex-row justify-between mt-2">
              <div className="text-gray-500 font-semibold bg-[#303540] px-2 py-1 rounded-md">
                <p className="text-sm">@james</p>
              </div>
              <div className="text-gray-500 font-semibold  bg-[#303540] px-2 py-1 rounded-md">
                <p className="text-sm">Sun Aug 06 2023</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <p className="text-base text-gray-300">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...
            </p>
          </div>
        </div>
      </div>
  )
}

export default Blogs