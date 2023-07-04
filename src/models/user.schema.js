import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name should not exceed 50 character"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Min characters should be 8"],
        select: false, // when you try to bring password it won't auto select and bring it.
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

},{timestamps:true})




export default mongoose.model("User", userSchema)