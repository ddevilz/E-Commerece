import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from  "../config/index.js";
import crypto from "crypto";

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
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    //compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    },
    // generate JWT token jwt.sign(payload (you can give anything as a payload), secretOrPrivateKey, [options, callback])
    genJWTtoken: function(){
        JWT.sign({
            _id: this._id,
            role: this.role
        }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY})
    },

    // generate forgot password token
    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString("hex")

        //just to encrypt the token encrypted by crypto
        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(forgotToken)
        .digest("hex")
        
        // time for token to expire
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        return forgotToken
    }
}

export default mongoose.model("User", userSchema)