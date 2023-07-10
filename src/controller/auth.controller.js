import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/customError";
import User from "../models/user.schema.js"

const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req, res) => {
    // getting the data from user
    const { name, email , password } =  req.body;

    // validation
    if (!name || !email || !password) {
        throw new CustomError("Please fill all the fields Required", 400);
        // throw new Error("Please fill all the fields Required") -- we are using CustomError
    }

    //check if user already exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError("User already exist", 400)
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password
    })
    const token = user.genJWTtoken()
    //safety - when creation of the user is happening "select:false" is not respected. when we use a method like find or findAndUpdate then select false is does it works
    user.password = undefined;
    
    // sending cookie
    res.cookie("token", token, cookieOptions)

    // sending back the response to user
    res.status(200).json({
        success: true,
        token,
        user
    })

})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        throw new CustomError("Please fill all the fields", 400)
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (isPasswordMatched) {
        const token = user.genJWTtoken()
        user.password = undefined,
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Email / Password is incorrect", 400)
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})


export const getProfile = asyncHandler(async (req, res) => {
    const { user } = req

    if (!user) {
        throw new CustomError("User not found", 400)
    }

    res.status(200).json({
        success: true,
        user
    })
})