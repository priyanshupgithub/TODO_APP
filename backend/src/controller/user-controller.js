import User from "../models/user-model.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Username must be 2 characters long." })
    .max(20),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password atleast 6 characters long." })
    .max(30),
});

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const validate = userSchema.safeParse({ userName, email, password });
    if (!validate.success) {
      const errorMessage = validate.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User created successfully.", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in User registration." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email }).select("password userName password");
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res
      .status(200)
      .json({ message: "User logged in successfully.", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in User logging." });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in User Logout." });
  }
};

export const update = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    let updateData = {userName,email,password};
    if(password){
        updateData.password = await bcrypt.hash(password,10);
    }
    const newCredentials = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "User Updated successfully.", newCredentials });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in User Updation." });
  }
};
