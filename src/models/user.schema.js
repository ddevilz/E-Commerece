import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs"

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

// encrypting the password before saving: HOOKS
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    //compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

export default mongoose.model("User", userSchema)