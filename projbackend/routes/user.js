const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPosts,
  pushLikes,
  pullLikes,
  getName,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser); //all routes assocaited with user we will preifx /user
// router.get("/users", getAllUsers);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser); //all routes assocaited with user we will preifx /user
router.put("/posts/user/:userId", isSignedIn, isAuthenticated, userPosts); //all routes assocaited with user we will preifx /user
router.put("/pushlikes/:userId", isSignedIn, isAuthenticated, pushLikes); //all routes assocaited with user we will preifx /user
router.put("/pulllikes/:userId", isSignedIn, isAuthenticated, pullLikes); //all routes assocaited with user we will preifx /user

module.exports = router;
