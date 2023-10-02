import React,{useEffect} from "react";
import Blogs from "../../pages/blog/Blogs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUserDetails } from "../../services/opreations/auth";

const Profile = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getAllUserDetails(token,navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="container mx-auto space-y-5  mt-10 mb-10">
    <Blogs/>
    </div>
  );
};

export default Profile;
