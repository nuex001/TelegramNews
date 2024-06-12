const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    point: {
      type: Number,
      default: 10,
    },
    react: { type: Number, default: 0 },
    post: { type: Number, default: 0 },
    loginCounts: { type: Number, default: 1 },
    loginCounts: { type: Number, default: 1 },
    lastLogin: { type: Date, default: Date.now },
    streak: { type: Number, default: 0 },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Unique validation
userSchema.plugin(uniqueValidator, {
  message: "{PATH} has already been taken",
});

// Hashing password
userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
//model
const User = mongoose.model("user", userSchema);

const postSchema = new Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Please enter text"],
    },
    text: {
      type: String,
      required: [true, "Please enter text"],
    },
    cover: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// Unique validation
postSchema.plugin(uniqueValidator, {
  message: "{PATH} has already been taken",
});

//model
const Post = mongoose.model("post", postSchema);

// Task schema and model
const taskSchema = new Schema({
  description: String,
  points: Number,
  link: String,
});

const Task = mongoose.model("Task", taskSchema);

// User-Task schema and model
const userTaskSchema = new Schema({
  userId: String,
  taskId: mongoose.Schema.Types.ObjectId,
  completed: Boolean,
});

const UserTask = mongoose.model("UserTask", userTaskSchema);
//
module.exports = { User, Post, Task, UserTask };
