const express = require("express");
const router = express.Router();

const {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  photo,
  getPost,
  likePost,
} = require("../controllers/post");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("postId", getPostById);

router.post("/post/create/:userId", isSignedIn, isAuthenticated, createPost);
router.get("/post/:postId", getPost);
// router.get("/post/:postId", post);
router.get("/post/photo/:postId", photo);
router.delete("/post/:postId/:userId", isSignedIn, isAuthenticated, deletePost);
router.put("/post/:postId/:userId", isSignedIn, isAuthenticated, updatePost);
router.get("/posts", getAllPosts);
router.get("/myposts/:userId", isSignedIn, isAuthenticated, getMyPosts);
router.put("/like/:postId", likePost);

module.exports = router;
