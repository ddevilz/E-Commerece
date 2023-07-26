import { Router } from "express";
import { generateOrder, generateRazorpayOrderId, getAllOrders, getMyOrders, updateOrderStatus } from "../controller/order.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware";
import AuthRoles from "../utils/authRoles.js";

const router = Router()



export default router;