const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedpassword, 
  });

  const userCreated = await newUser.save();
  if (!userCreated) {
    console.log("user cannot be created");
    return res.status(500).send("user cannot be created");
  } else {
    return res.status(200).send("user has been created to the database");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).send("Invalid email or password");
  }

  const mysecretkey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const payload = {
    name: user.name,
    email: user.email,
    password: user.password,
  };

  const token = jwt.sign(payload, mysecretkey, { expiresIn: "5d" });

  res.status(200).json({
    msg: "User is logged in",
    token: token,
  });
});

module.exports = router;
