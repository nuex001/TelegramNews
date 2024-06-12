const { Telegraf } = require("telegraf");
const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const OpenAI = require("openai");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//MIDDLEWARE

// dtjl9nigz
//Create our openAi instance
let TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
let CLOUDINARY_API = process.env.CLOUDINARY_API;
let CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const bot = new Telegraf(process.env.BOT_TOKEN);

//
cloudinary.config({
  cloud_name: "dtjl9nigz",
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
});
//
const auth = require("../middleWare/auth");

// SCHEMA
const { User, Post } = require("../models/Schema");

async function factCheckClaim(claim) {
  const apiKey = "AIzaSyCgIGA2Q1fPjEnaS9OWgt4gVibjIRzYAsY";
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${apiKey}`;
  try {
    const response = await axios.post(url, { query: claim });
    // const results = response.data.claims;
    // // Process and analyze results
    // return results;
  } catch (error) {
    console.error("Error fetching fact check results:", error);
    return null;
  }
}

// Working for users post
router.post("/", auth, async (req, res) => {
  const { title, paragraph, category } = req.body;
  const { id, username } = req.user;
  try {
    //   const check = await factCheckClaim("trump");
    let filesDir;

    const file = req.files.file;
    const cloudinaryResponse = await cloudinary.uploader.upload(
      file.tempFilePath
    );
    const dirPath = cloudinaryResponse.secure_url;
    // console.log(dirPath);
    const post = new Post({
      username: username,
      title: title,
      text: paragraph,
      cover: dirPath,
      category: category,
    });
    await post.save();
    res.json({
      msg: "Created Successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("title has already been taken")) {
      res.status(500).json({ err: "Title already exists" });
    } else {
      res.status(500).json({ err: "Please fill all inputs" });
    }
  }
});

// Working for review and make post
async function sendPhotoWithCaption(photoUrl, caption) {
  try {
    if (photoUrl) {
      await bot.telegram.sendPhoto(TELEGRAM_CHANNEL_ID, photoUrl, {
        caption: caption,
        parse_mode: "HTML",
      });
    } else {
      await bot.telegram.sendMessage(TELEGRAM_CHANNEL_ID, caption, {
        parse_mode: "HTML",
      });
    }
    console.log("Photo with caption sent successfully");
  } catch (error) {
    console.error("Error sending photo with caption:", error);
  }
}
//
router.put("/", auth, async (req, res) => {
  const { id, status } = req.body;
  const { role, username } = req.user;
  try {
    if (role !== "user") {
      const post = await Post.findById(id);
      if (!post) return res.status(500).json({ err: "Post doesn't exist" });
      if (status === "approve") {
        // console.log(post.text, post.cover);
        await Post.findByIdAndDelete(id);
        await User.findOneAndUpdate(
          { username: post.username },
          { $inc: { point: 1000, post: 1 } }
        );
        sendPhotoWithCaption(
          post.cover,
          `${post.title}\n \n${post.text}\nApproved by @${username}`
        );
        res.json({ msg: "Approved Successfully" });
      } else if (status === "decline") {
        await Post.findByIdAndDelete(id);
        res.json({ msg: "Declined Successfully" });
      }
      //   Increment points for the user who reviewed this post in both cases
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { point: 500, post: 1 },
      });
    } else {
      res.status(500).json({ err: "UnAuthorized, Only Reviewers can Visit" });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("title has already been taken")) {
      res.status(500).json({ err: "Title already exists" });
    } else {
      res.status(500).json({ err: "Please fill all inputs" });
    }
  }
});

// GET USER INFO
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
