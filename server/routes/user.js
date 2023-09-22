import express from "express"
import { signup,login,getAllUserDetails,logout } from "../controllers/auth.js"
import authenticateJwt from "../middleware/auth.js"

const router = express.Router()

router.get("/test",authenticateJwt,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome come to the protected route"
    })
})
router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/getAllUserDetails",authenticateJwt,getAllUserDetails)


export default router
