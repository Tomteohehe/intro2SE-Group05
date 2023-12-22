const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const verifyToken = require("../middleware/auth");

// @route GET api/auth
// @desc check if user logged in
// @access Public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/register
// desc Register user
// @access Public

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing information" });
  }
  try {
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already in use" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN
    );
    res.json({
      success: true,
      message: "Create new user successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/auth/login
// desc Login user
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  }
  try {
    const existUsername = await User.findOne({ username });
    if (!existUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Error in username or password" });
    }
    if (existUsername.password != password) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }
    const accessToken = jwt.sign(
      { userId: existUsername._id },
      process.env.ACCESS_TOKEN
    );
    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      username: existUsername.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/getuser
// desc Login user
// @access Public

router.post("/getuser", async (req, res) => {
  const { id } = req.body;

  try {
    const data = await User.find({ _id: id })
    if(data){
      res.json({success: true, users: data});
    }
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/auth/update
// @desc Update user
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  let updatedUser = ({
    username,
    email,
    password,
    avatar,
    contact,
    description,
    id,
  } = req.body);

  const implementUser = {
    username: updatedUser.username,
    email: updatedUser.email,
    password: updatedUser.password,
    avatar: updatedUser.avatar,
    contact: updatedUser.contact,
    description: updatedUser.description,
  };

  try {
    const existUsername = await User.findOne({ username: username });
    if (existUsername) {
      if (existUsername._id != id)
        return res
          .status(400)
          .json({ success: false, message: "Username is already in use" });
    }

    const updateCondition = { _id: req.params.id };
    updatedUser = await User.findOneAndUpdate(updateCondition, implementUser, {
      new: true,
    });

    // Cannot update User
    if (!updatedUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }
    return res.json({
      success: true,
      message: "User profile updated succesfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/alluser", async (req, res) => {
  const allUser = await User.find();
  res.json({ success: true, users: allUser });
});

module.exports = router;
