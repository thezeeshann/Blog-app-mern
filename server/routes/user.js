import express from "express"
import { signup,login,getAllUser,getSingleUser } from "../controllers/auth.js"
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
router.get("/getAllUsers",getAllUser)
router.get("/getSingleUser",getSingleUser)


export default router
