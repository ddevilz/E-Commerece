import Coupon from "../models/coupon.schema";
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/customError.js"

export const createCoupon = asyncHandler(async (req, res) => {
    const {code, discount} = req.body

    if (!code || !discount) {
        throw new CustomError("Code and discount are needed", 400)
    }
    
    const existingCode = await Coupon.find(code)

    if(existingCode){
        throw new CustomError("Code already exists", 400)
    } else {
        const newCode = await Coupon.create({
            code,
            discount
        })
    }

    res.status(200).json({
        success:true,
        message:"Coupon created successfully",
        newCode
    })
})

export const getAllCoupons = asyncHandler(async (req, res) => {
    const allCoupons = await Coupon.find()

    if (!allCoupons) {
        throw new CustomError("No coupons found", 400)
    }

    res.status(200).json({
        success:true,
        allCoupons
    })
})

export const updateCoupons = asyncHandler(async (req, res) => {
    const {code, discount} = req.body
    const {id: couponId} = req.params

    const findCoupon = await Coupon.findById(couponId)

    if (!findCoupon) {
        throw new CustomError("Coupoon not found", 400)
    }

    const updatedCoupon = await Coupon.updateOne(couponId, {
        code,
        discount
    })
    
    res.status(200).json({
        success:true,
        message: "your coupon is updated",
        updateCoupons
    })
})

export const deleteCoupon = asyncHandler(async (req, res) => {
    const {id: couponId} = req.params

    const coupon = await Coupon.findByIdAndDelete(couponId)

    if (!coupon) {
        throw new CustomError("Collection to be deleted is not found", 401)
    }
    res.status(200).json({
        success: true,
        message: "Coupon was deleted successfully",
    })
})

export const getAllActiveCoupons = asyncHandler(async (req, res) => {
    const activeCoupons = await Coupon.find({active: true})

    if (!activeCoupons) {
        throw new CustomError("No active coupons found", 400)
    }

    res.status(200).json({
        success:true,
        activeCoupons
    })
})
