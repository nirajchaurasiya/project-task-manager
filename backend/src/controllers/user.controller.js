import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { options } from "../utils/cookieOptions.js";

const generateAccessAndRefereshTokens = async (userId) => {
   try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };
   } catch (error) {
      throw new ApiError(
         500,
         error ||
            "Something went wrong while generating referesh and access token"
      );
   }
};

const login = asyncHandler(async (req, res, next) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         throw new ApiError(400, "All fields are required");
      }

      const user = await User.findOne({ email });

      if (!user) {
         throw new ApiError(401, "User doesn't exists");
      }
      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
         throw new ApiError(403, "Invalid credentials");
      }
      const { accessToken, refreshToken } =
         await generateAccessAndRefereshTokens(user._id);

      const loggedInUser = await User.findById(user._id).select(
         "-password -refreshToken"
      );
      return res
         .status(200)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", refreshToken, options)
         .json(
            new ApiResponse(
               200,
               {
                  user: loggedInUser,
                  accessToken,
                  refreshToken,
               },
               "Login success"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const loginUserWithToken = asyncHandler(async (req, res, next) => {
   try {
      const { accessToken, refreshToken } =
         await generateAccessAndRefereshTokens(req.user._id);

      const loggedInUser = await User.findById(req.user._id).select(
         "-password -refreshToken"
      );

      return res
         .status(200)
         .cookie("accessToken", accessToken, {})
         .cookie("refreshToken", refreshToken, options)
         .json(
            new ApiResponse(
               200,
               {
                  user: loggedInUser,
                  accessToken,
                  refreshToken,
               },
               "User logged In Successfully"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const register = asyncHandler(async (req, res, next) => {
   try {
      const { email, fullName, password } = req.body;

      if ([email, fullName, password].some((e) => e.trim() === "")) {
         throw new ApiError(400, "All fields are required");
      }

      const user = await User.findOne({ email });

      if (user) {
         throw new ApiError(409, "User already exists");
      }

      const createUser = await User.create({
         email,
         password,
         fullName,
      });

      await createUser.save();

      const createdUser = await User.findById(createUser._id);

      if (!createdUser) {
         throw new ApiError(
            500,
            "Something went wrong while creating the user"
         );
      }

      return res.status(200).json(new ApiResponse(200, [], "User created"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const logoutUser = asyncHandler(async (req, res) => {
   try {
      await User.findByIdAndUpdate(
         req.user._id,
         {
            $unset: {
               refreshToken: 1,
            },
         },
         {
            new: true,
         }
      );

      return res
         .status(200)
         .clearCookie("accessToken", options)
         .clearCookie("refreshToken", options)
         .json(new ApiResponse(200, {}, "User logged Out"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
   const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

   if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request");
   }

   try {
      const decodedToken = jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findById(decodedToken?._id);

      if (!user) {
         throw new ApiError(401, "Invalid refresh token");
      }

      if (incomingRefreshToken !== user?.refreshToken) {
         throw new ApiError(401, "Refresh token is expired or used");
      }

      const options = {
         httpOnly: true,
         secure: true,
      };

      const { accessToken, newRefreshToken } =
         await generateAccessAndRefereshTokens(user._id);

      return res
         .status(200)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", newRefreshToken, options)
         .json(
            new ApiResponse(
               200,
               { accessToken, refreshToken: newRefreshToken },
               "Access token refreshed"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const updateProfile = asyncHandler(async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized request");
      }

      const user = await User.findById(userId);

      if (!user) {
         throw new ApiError(400, "User couldn't be found");
      }

      const { email, fullName, password } = req?.body;

      if (email) {
         user.email = email;
      }

      if (fullName) {
         user.fullName = fullName;
      }

      if (password) {
         user.password = password;
      }

      await user.save();

      const updatedUser = await User.findById(userId).select(
         "-password -refreshToken"
      );

      return res
         .status(200)
         .json(new ApiResponse(200, { user: updatedUser }, "User updated"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

export {
   login,
   loginUserWithToken,
   register,
   logoutUser,
   refreshAccessToken,
   updateProfile,
};
