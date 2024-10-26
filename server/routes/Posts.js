const express = require("express");
const router = express.Router();

const {
  createPost,
  createComment,
  getPosts,
  getComments,
  getMyPosts,
} = require("../controllers/Posts");

const { auth } = require("../middlewares/auth");

router.post("/createPost", auth, createPost);
router.post("/createComment/:postId", auth, createComment);
router.get("/getPosts", getPosts);
router.get("/getMyPosts", auth, getMyPosts);
router.get("/getComments/:postId", getComments);

module.exports = router;
