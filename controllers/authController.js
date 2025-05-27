import { User } from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashed,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (e) {
    res.swtatus(400).json({
      message: "User registration failed",
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    token,
    username,
  });
};
