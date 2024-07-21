import bcryptjs from "bcryptjs";
import User from "../../modals/userModal.js";
import {
  forgotPasswordValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
} from "../../validations/userValidation.js";
import { createToken } from "../../utils/token.js";
import { errorHandler } from "../../utils/error.js";
import { sendMail } from "../../utils/sendMail.js";

export const signIn = async (req, res, next) => {
  try {
    await signInValidationSchema.validate(req.body, { abortEarly: false });
    const { email = "", password = "" } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return next(errorHandler(401, "Invalid email or password."));
    const isValidPassword = await bcryptjs.compare(password, user?.password);
    if (!isValidPassword) return next(errorHandler(401, "Invalid email or password."));
    const { password: removePassword, ...rest } = user?._doc;
    const access_token = createToken({
      id: user?._id?.toString(),
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: { access_token, ...rest },
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return next(errorHandler(422, "Validation Error.", error?.errors || null));
    } else {
      return next(errorHandler(500, "Something went wrong!."));
    }
  }
};
export const signUp = async (req, res, next) => {
  try {
    await signUpValidationSchema.validate(req.body, { abortEarly: false });
    const { username = "", email = "", password = "" } = req.body;
    const user = await User.findOne({ email: email });
    if (user) return next(errorHandler(401, "This email is already exist."));
    const hashedPassword = await bcryptjs.hash(password, 10);
    const saveUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const response = await saveUser.save();
    const { password: removePassword, ...rest } = response?._doc;
    res.status(201).json({ success: true, message: "User created successfully", data: { ...rest } });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return next(errorHandler(422, "Validation Error.", error?.errors || null));
    } else {
      return next(errorHandler(500, "Something went wrong!."));
    }
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { email = "" } = req.body;
    await forgotPasswordValidationSchema.validate(req.body, { abortEarly: false });
    const user = await User.findOne({ email: email });
    if (!user) return next(errorHandler(401, "Invalid email."));

    const token = createToken({
      id: user?._id?.toString(),
    });
    sendMail({
      senderEmail: email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset-password/${user?._id}/${token}`,
      res,
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return next(errorHandler(422, "Validation Error.", error?.errors || null));
    } else {
      return next(errorHandler(500, "Something went wrong!."));
    }
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.status(200).json({ success: true, message: "Your password has been updated successfully." });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong!."));
  }
};


export const oAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const { password: removePassword, ...rest } = user?._doc;
      const access_token = createToken({
        id: user?._id?.toString(),
      });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        data: { access_token, ...rest },
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.username?.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      const result = await newUser.save();
      const { password: hashedPassword2, ...rest } = result._doc;
      const access_token = createToken({
        id: result?._id?.toString(),
      });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        data: { access_token, ...rest },
      });
    }
  } catch (error) {
    next(error);
  }
};



export const changePassword = async (req, res, next) => {
  try {
    const { old_password = '', new_password = '', user_id = '' } = req.body;
    if (!user_id) return next(errorHandler(401, "Invalid user ID."));
    if (!old_password || !new_password) return next(errorHandler(401, "All fields are required."));
    if (old_password === new_password) return next(errorHandler(401, "New password must be different from the old password."));
    const user = await User.findOne({ _id: user_id });
    if (!user) return next(errorHandler(401, "User does not exist."));
    const isMatch = await bcryptjs.compare(old_password, user.password);
    if (!isMatch) return next(errorHandler(401, "Old password is incorrect."));
    const hashedPassword = await bcryptjs.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password has been changed successfully." });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong!."));
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username = '', email = '', phone_number = '', address = '', user_id = '' } = req.body;
    if (!user_id) return next(errorHandler(401, "Invalid user ID."));
    const user = await User.findOne({ _id: user_id });
    if (!user) return next(errorHandler(401, "User does not exist."));
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone_number) user.phone_number = phone_number;
    if (address) user.address = address;
    const response = await user.save();
    const { password: removePassword, ...rest } = response?._doc;
    res.status(200).json({ success: true, message: "Profile updated successfully.", data: { ...rest } });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong!."));
  }
};




