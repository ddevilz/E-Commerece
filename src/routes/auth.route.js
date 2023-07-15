import { Router } from "express";
import { getProfile, login, logout, signUp } from "../controller/auth.controller";


const router = Router()

router.use("/signUp", signUp)
router.use("/login", login)
router.use("/logout", logout)

router.use("/getprofile", getProfile)

export default router