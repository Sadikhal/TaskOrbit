import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { createError } from '../lib/createError.js';
import { generateTokenAndSetCookie } from '../lib/generateTokenAndSetCookie.js';


//register
export const register = async (req, res, next) => {
  try {
    const { email, password, name, number } = req.body;

    // Validate inputs
    if (!email || !password || !name || !number) {
      return next(createError(400, "Name, email, number and password are required"));
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "Email already registered"));
    }

    // Hash password for security
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hash,
      name,
      number,
    });

    await user.save();

    return res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};


//login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check required input
    if (!email || !password)
      return next(createError(400, "Email and password are required"));

    // Find user
    const user = await User.findOne({ email });
    if (!user) return next(createError(401, "User not found"));

    // Compare passwords
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return next(createError(401, "Wrong credentials"));
     
    //generate token and cookie
    generateTokenAndSetCookie(res, user._id);

    const { password: pwd, ...info } = user._doc;

    return res.status(200).json(info);

  } catch (error) {
    next(error);
  }
};


//logout
export const logOut = (req, res, next) => {
  res
    .clearCookie("access_token", { // clear the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    })
    .status(200)
    .send("User has been logged out");
};


//get user
export const getUser = async (req, res, next) => {
  try {
    const id = req.userId;

    if (!id) return next(createError(401, "Unauthorized"));

    // Fetch user without password
    const user = await User.findById(id).select("-password");
    if (!user) return next(createError(404, "User not found"));

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//update password
export const updateUser = async (req, res, next) => {
  try {
    const id = req.userId;

    if (!id) return next(createError(401, "Unauthorized"));

   //Only these fields are allowed to be updated.
    const allowedUpdates = ["name", "number","age"];
    const updates = {};

    // update object with allowed fields only
    for (const key of allowedUpdates) {
      if (req.body[key]) updates[key] = req.body[key];
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedUser) return next(createError(404, "User not found"));

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    next(err);
  }
};
