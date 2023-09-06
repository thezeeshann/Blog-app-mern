import express from "express"
import { signup,login } from "../controllers/auth.js"
import authenticateJwt from "../middleware/auth.js"

const router = express.Router()

router.get("/test",authenticateJwt,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome come to the prodected route"
    })
})
router.post("/signup",signup)
router.post("/login",login)


export default router
