import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/customError";
import User from "../models/user.schema.js"

const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

// signUp a new user

const signUp = asyncHandler(async (req, res) => {
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


export default signUp