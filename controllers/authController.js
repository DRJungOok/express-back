import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({username});
    if (existingUser) {
      console.log('이미 존재하는 사용자입니다:', username);
      return res.status(400).json({ message: "Username already exists" });
    }
    console.log('reigster data ::', req.body);
    console.log(`usernae: ${username}, password: ${password}, hashed: ${hashed}`);
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
    console.error("User registration failed:", e.meassage);
    res.status(400).json({
      message: "User registration failed",
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log('로그인 요청 ::', username, password);
  console.log('📥 로그인 요청 받은 데이터:', req.body);
  if (!user) {
    console.log('로그인 실패 :: 사용자 없음');
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('로그인 실패 :: 비밀번호 불일치');
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
