import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Extract the refresh token from cookies or Authorization header
    const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized request - No refresh token provided");
    }

    // Verify the refresh token
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user with the matching refresh token
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
