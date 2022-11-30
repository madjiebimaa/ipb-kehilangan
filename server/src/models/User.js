import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.Model("User", userSchema);

export default User;
