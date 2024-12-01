import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    email: {
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true,

    },
    fullName: {
        type: String,
        unique: true,
        index:true,
        trim:true,

    },
    avatar: {
        type: String,  //cloudinary service
        required:true

    },
    coverImage: {
        type: String,  //cloudinary url 
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    refreshToken: {
        type: String,

    },
    watchHistory: [
        {
        type: Schema.Types.ObjectId,
        ref: "Video",
    }]
}, { timestamps: true })


userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})  // don't use arrow function here since it does not have the context or "this" reference.


// custome methods provided by mongoose 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


//TOKENS

userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){}
export const User = mongoose.model('User', userSchema)