import { Router } from "express";
import auth from "./auth.route.js"
import couponRoutes from "./coupon.route.js"
import collectionRoutes from "./collection.route.js"

const router = Router()

router.use("/auth", auth)
router.use("/coupon", couponRoutes)
router.use("/collection", collectionRoutes)

export default router