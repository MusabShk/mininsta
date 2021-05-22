const Post = require("../models/post");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user; //we create one object named as profile
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id }, //...profile._id.. **we are getting this from :userId which we are using in router**
    { $set: req.body }, //whatever we want to update we put it into dollar set **req.body coming from frontend** so whatever we send from frontend will be updated
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPosts = (req, res) => {
  Post.find({ user: req.profile._id })
    .populate("user", "_id name") //whenever u reference something in different collection (in usrer model we are using posts from differen model)
    .exec((err, posts) => {
      //.populate("use.."..)  here we write 2 things 1)model which you want to update 2)fields whih you want to bring in
      if (err) {
        return res.status(400).json({
          error: "No Post in this account",
        });
      }
      return res.json(posts);
    });
};

exports.pushLikes = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    {
      $push: { likedpost: req.body.postId },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        error: "Unable to pushliikes",
      });
    }
    return res.json(result);
  });
};

exports.pullLikes = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    {
      $pull: { likedpost: req.body.postId },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        error: "Unable to pullliikes",
      });
    }
    return res.json(result);
  });
};
