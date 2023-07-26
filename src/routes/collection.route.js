import { Router } from "express";
import { createCollection, deleteCollection, getAllCollection, updateCollection } from "../controller/collection.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware";
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection)
router.get("/",  getAllCollection)

export default router;