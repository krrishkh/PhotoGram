import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Feed"
            }
        ],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    try {
        const aToken = jwt.sign(
            {
                _id: this._id,
                username: this.username,
                fullname: this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        
        return aToken
    } catch (error) {
        console.log("error while generating access token", error)
        throw new ApiError(500, "access token generation failed")
    }
    
}
userSchema.methods.generateRefreshToken = function(){
    try {
        const rToken=  jwt.sign(
            {
                _id: this._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    
        console.log("refresh token" ,rToken)
        return rToken
    } catch (error) {
        console.log("error while generating refresh token", error)
        throw new ApiError(500, "refresh token generation failed")
    }


}

export const User = mongoose.model("User", userSchema)