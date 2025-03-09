import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Post } from "../models/post.models.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to the user document
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, error.message || "Something went wrong while generating access and refresh tokens");
    }
};

const registerUser = asyncHandler( async (req, res) => {
    const {fullname, username, password} = req.body

    if (
        [fullname, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username existed")
    }

    const user =  await User.create({
        fullname,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully")
    )

 })

const loginUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body
    
    if(!username || !password){
        throw new ApiError(400, "username or password is required")
    }

    const user = await User.findOne({username})

    if(!user){
        throw new ApiError(404, "User doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User credentials")
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)
    
    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true,
        
    }
    
    res.cookie("accessToken", accessToken?? null)
    res.cookie("refreshToken", refreshToken)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken , refreshToken
                
            },
            "User Logged in successfully"
        ),
        accessToken,
        refreshToken
    )

})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized error")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired")
        }
    
        const options={
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, "refresh token is expired or used")
    }
})


const uploadPost = asyncHandler(async (req, res) => {
    try {
      const { content, imageUrl = null } = req.body;

      let img = imageUrl;

      // Capture the uploaded file
      const file = req.file ?? null;
      if(file!=null){
        const uploadedImage= await uploadOnCloudinary("public/uploads/"+file.originalname.replace(/\s+/g, "_"));
        img = uploadedImage.url;
        // img = await uploadOnCloudinary(file)
      }
  
      // Ensure consistent and unique image path
 
      console.log("Image URL:", img);

      
  
      if (!img) {
        return res.status(400).json({ message: "Image is required" });
      }
    
      console.log(req.user)
      // Create the post
      const post = await Post.create({
        content: content,
        author: req.user._id,// Assuming verifyJWT middleware sets req.user
        image: img,
      });
  
      return res.status(201).json({
        success: true,
        message: "Post uploaded successfully",
        post,
      });
    } catch (error) {
      console.error("Error uploading post:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
})


const getFeed = asyncHandler(async (req, res) => {
    // Fetch all posts with author details and likes count
    const posts = await Post.find()
      .populate("author", "fullname")  // Fetches author's fullname
      .populate({
        path: "likes",
        select: "fullname",
        options: { limit: 10 } // Optional: limit the number of likes fetched
      })
      .sort({ createdAt: -1 }); // Sorts posts by newest first
  
    if (!posts.length) {
      res.status(404);
      throw new Error("No posts found");
    }
  
    // Add likes count to each post
    const postsWithLikesCount = posts.map(post => ({
      ...post.toObject(),
      likesCount: post.likes.length
    }));
  
    res.status(200).json(postsWithLikesCount);
  });

  const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.body; // Get postId from URL
    const userId = req.user; // Get userId from authenticated user
    console.log(postId)
    console.log(userId)
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        res.status(404);
        throw new Error("Post not found");
      }
  
      // Check if user already liked the post
      const alreadyLiked = post.likes.includes(userId);
  
      if (alreadyLiked) {
        // Unlike the post
        post.likes = post.likes.filter((id) => id.toString() !== userId);
      } else {
        // Like the post
        post.likes.push(userId);
      }
  
      await post.save();
  
      res.status(200).json({
        success: true,
        message: alreadyLiked ? "Post unliked" : "Post liked",
        likes: post.likes.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating like status",
        error: error.message,
      });
    }
  });


export{
    registerUser,
    loginUser,
    refreshAccessToken,
    uploadPost,
    getFeed,
    likePost
}