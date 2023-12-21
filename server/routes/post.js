const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const verifyToken = require("../middleware/auth");

// @route GET api/post
// @desc Get posts
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @route POST api/post
// desc create post
// @access private

router.post("/", verifyToken, async (req, res) => {
  const { title, category, image, content } = req.body;

  // simple validation

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    const newPost = new Post({
      title,
      category,
      image,
      content,
      user: req.userId,
    });

    await newPost.save();
    res.json({
      success: true,
      message: "New post has been posted!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/post
// @desc Get detail post
// @access Private

router.post("/detailpost", verifyToken, async (req, res) => {
  const { id } = req.body;
  try {
    const detailedPost = await Post.find({ _id: id }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts: detailedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @route GET api/newestpostlarge
// @desc Get Newest post released
// @access Public

router.get("/newestpostlarge", async (req, res) => {
  try {
    const lastPost = await Post.find()
      .sort({ _id: -1 })
      .limit(1)
      .populate("user", ["username"]);
    res.json({ success: true, posts: lastPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @route GET api/newestpost
// @desc Get Newest post released
// @access Public

router.get("/newestpost", async (req, res) => {
  try {
    const somelastPost = await Post.find()
      .sort({ _id: -1 })
      .limit(3)
      .skip(1)
      .populate("user", ["username"]);
    res.json({ success: true, posts: somelastPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @route PUT api/post
// @desc Update post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, category, image, content } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    let updatedPost = {
      title,
      category,
      image,
      content,
    };

    const updateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {
      new: true,
    });

    // User not authorised to update post or post not found
    if (!updatedPost) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Post not found or user not authorized",
        });
    }

    return res.json({
      success: true,
      message: "Post updated succesfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DELETE api/post
// @desc Delete post
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(deleteCondition);

    // user not authorised or post not found
    if (!deletedPost) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Post not found or user not authorized",
        });
    }

    return res.json({
      success: true,
      message: "Post deleted succesfully",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/allpost", async (req, res) => {
  const allPost = await Post.find();
  res.json({success: true, posts: allPost});
});

module.exports = router;
