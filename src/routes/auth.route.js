import { Router } from "express";
import { getProfile, login, logout, signUp, forgotPassword, resetPassword } from "../controller/auth.controller";
import {isLoggedIn} from "../middlewares/auth.middleware.js"


const router = Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("/profile", isLoggedIn, getProfile)
router.post("/password/forgot/", forgotPassword)
router.post("/password/reset/:token", resetPassword)


export default router