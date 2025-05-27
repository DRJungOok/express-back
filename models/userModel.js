import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

export const user = mongoose.model("User", userSchema);
export default user;
