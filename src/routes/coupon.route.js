import { Router } from "express";
import { createCoupon, deleteCoupon, getAllActiveCoupons, getAllCoupons, updateCoupons } from "../controller/coupon.controller";
import AuthRoles from "../utils/authRoles.js"
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js"


const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCoupon)

router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), deleteCoupon)

router.put("/action/:id", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), updateCoupons)

router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllCoupons)

router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllActiveCoupons)


export default router