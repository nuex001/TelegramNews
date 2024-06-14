const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//MIDDLEWARE
const auth = require("../middleWare/auth");

// SCHEMA
const { User } = require("../models/Schema");

const secretKey = process.env.SECRET_KEY;
// For Creating token
const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};
/**
 * @REFERALL On each refer, the user get's 100 points
 * @REFERALL_ID is the id of the returned user
 */
// Working for register users
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { username, id, referId } = req.body;
  let token;
  const name = username.toLowerCase();
  try {
    let user = await User.findOne({ name });
    //   Checking if user is null
    if (!user) {
      const user = new User({
        username: name,
        password: id,
      });
      await user.save();
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
        },
      };
      const token = createToken(payload);
      const userResponse = user.toObject();
      delete userResponse.password;
      res.json({
        jwt: token,
        role: user.role,
        myId: user.id,
        user: userResponse,
      });
      // console.log(referId);
      if (referId !== "") {
        let refferUser = await User.findByIdAndUpdate(referId, {
          $inc: { point: 100 },
        });
      }
    } else {
      // Matching the password
      await bcrypt.compare(
        `${id}`,
        user.password,
        async function (err, response) {
          if (response) {
            const currentDate = new Date();
            const lastLoginDate = new Date(user.lastLogin);
            // Check for user verification and update points
            const isSameDay =
              currentDate.getFullYear() === lastLoginDate.getFullYear() &&
              currentDate.getMonth() === lastLoginDate.getMonth() &&
              currentDate.getDate() === lastLoginDate.getDate();
            if (!isSameDay) {
              // Update login count for today
              await User.findByIdAndUpdate(user._id, {
                $inc: { loginCounts: 1 },
              });
            }

            // If login is not consecutive, reset streak and update login count for today
            const today = new Date().setHours(0, 0, 0, 0);
            const lastLogin = new Date(user.lastLogin).setHours(0, 0, 0, 0);
            const diff = (today - lastLogin) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
              await User.findByIdAndUpdate(user._id, {
                $inc: { streak: 1 },
              });
            } else {
              await User.findByIdAndUpdate(user._id, { streak: 0 });
            }

            await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
            // Checking for user Verification
            // payload and sign
            const payload = {
              user: {
                id: user.id,
                role: user.role,
                username: user.username,
              },
            };
            const token = createToken(payload);
            const userResponse = user.toObject();
            delete userResponse.password;
            res.json({
              jwt: token,
              role: user.role,
              myId: user.id,
              user: userResponse,
            });
          } else {
            console.log(err);
            res.status(500).json({ err: "Invalid Credentials" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("username has already been taken")) {
      res.status(500).json({ err: "username has already been taken" });
    } else {
      res.status(500).json({ err: "Please fill all inputs" });
    }
  }
});

// GET USER INFO
router.put("/", auth, async (req, res) => {
  const { username, status } = req.body;
  try {
    const { role } = req.user;
    if (role === "admin") {
      // console.log(username);
      const user = await User.findOne({ username: username });
      // console.log(user);
      if (!user) return res.status(404).json({ err: "No user was found" });

      const updatedRole = status === "add" ? "reviewer" : "user";
      await User.findOneAndUpdate(
        { username: username },
        { role: updatedRole }
      );

      res.json({ msg: "Role updated successfully" });
    } else {
      res.status(500).json({ err: "UnAuthorized, Only Admin can Visit" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// GET USER INFO
router.get("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
