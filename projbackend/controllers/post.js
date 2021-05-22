const Post = require("../models/post");
const formidable = require("formidable"); //require formidable
const _ = require("lodash"); //require Lodash
const fs = require("fs"); //this is already provided by node (filestructure)**to access path of file**
// const product = require("../models/product");
const { sortBy } = require("lodash");

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Post not found",
        });
      }
      req.post = post;
      next();
    });
};

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm(); //creation of a form **as the syntax says**
  form.keepExtensions = true; //we want the extention of file uploaded

  form.parse(req, (err, fields, file) => {
    //form accepts 3 parameter(err,field,files)
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructuring the the fields
    const { title, body } = fields;

    //   if(!title || !body) {  //checking whether user has given all data of model
    //     return res.status(400).json({
    //         error: "please include all fields"
    //     })
    //   }
    let post = new Post({ ...fields, postedBy: req.auth._id });

    //handle file here
    if (file.photo) {
      //(as we are using photo)
      if (file.photo.size > 3000000) {
        //checking file size
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      post.photo.data = fs.readFileSync(file.photo.path); //this photo will have data as type "buffer"(see in models(product.js))
      post.photo.contentType = file.photo.type; //we will send path to fs   //content type will be same as file type
    }
    //save to the DB
    post.save((err, post) => {
      if (err) {
        res.status(400).json({
          error: err.message,
          // error: "Saving post in DB failed"
        });
      }
      res.json(post);
    });
  });
};

//middleware
exports.photo = (req, res, next) => {
  if (req.post.photo.data) {
    //...photo.data...**is is another way to check whether photo has some data(if yes then go ahead)**
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
  }
  next();
};

exports.deletePost = (req, res) => {
  let post = req.post; //with the help of param :productId
  post.remove((err, deletedPost) => {
    if (err) {
      res.status(400).json({
        error: "Unable to delete post",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedPost,
    });
  });
};

exports.updatePost = (req, res) => {
  let form = new formidable.IncomingForm(); //creation of a form **as the syntax says**
  form.keepExtensions = true; //we want the extention of file uploaded

  form.parse(req, (err, fields, file) => {
    //form accepts 3 parameter(err,field,files)
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation code
    let post = req.post; //user provides all he fields of the product model**we are saving it into product**
    post = _.extend(post, fields); //using lodash      //updates the values      **fields will be updated in site the product**

    //handle file here
    if (file.photo) {
      //(as we are using photo)
      if (file.photo.size > 3000000) {
        //checking file size
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      post.photo.data = fs.readFileSync(file.photo.path); //this photo will have data as type "buffer"(see in models(product.js))
      post.photo.contentType = file.photo.type; //we will send path to fs   //content type will be same as file type
    }

    //save to the DB
    post.save((err, post) => {
      if (err) {
        res.status(400).json({
          error: "Saving post in DB failed",
        });
      }
      res.json(post);
    });
  });
};

exports.getAllPosts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; //taking from frontend
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; //taking from frontend

  Post.find()
    .select("-photo")
    .populate("postedBy")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, posts) => {
      if (err) {
        res.status(400).json({
          error: "No post found",
        });
      }
      res.json(posts);
    });
};

exports.getMyPosts = (req, res) => {
  // Post.find({postedBy:req.user._id})
  // .populate("postedBy","_id name")
  // .exec((err,posts)=>{
  //     if(err){
  //         return res.status(400).json({
  //             error: "Post not found"
  //           });
  //     }
  //     return   res.json(posts)
  // })
  // let limit=req.query.limit? parseInt(req.query.limit):8;  //taking from frontend
  // let sortBy=req.query.sortBy? req.query.sortBy:"_id";  //taking from frontend

  //   Post.find().select("-photo").populate("postedBy").limit(limit).sort([[sortBy,"asc"]]).exec((err,posts)=>{
  //     if (err) {
  //         res.status(400).json({
  //           error: "No products found"
  //         });
  //       }
  //       res.json(posts)
  //   })
  // console.log(req.profile);
  Post.find({ postedBy: req.profile._id }) //...profile._id.. **we are getting this from :userId which we are using in router**
    .populate("postedBy", "_id name")
    .exec((err, myposts) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to get posts",
        });
      }
      res.json({ myposts });
    });
};

exports.photo = (req, res, next) => {
  if (req.post.photo.data) {
    //...photo.data...**is is another way to check whether photo has some data(if yes then go ahead)**
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
  }
  next();
};

exports.getPost = (req, res) => {
  req.post.photo = undefined; //we dont give the photo bcz it loads slow (large file)
  return res.json(req.post);
};

exports.likePost = (req, res) => {
  // Post.findByIdAndUpdate(
  //   req.postId,

  //   {
  //     new: true,
  //   }
  // ).exec((err, result) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Unable to like post",
  //     });
  //   }
  //   res.json(result);
  // });

  //req.profile (getUserById)

  let post = req.post;
  const id = post._id;
  const updates = req.body;
  Post.findByIdAndUpdate(id, updates, { new: true }).exec((error, post) => {
    if (error) {
      return res.status(400).json({
        error: "Unable to like post",
      });
    }
    res.json(post);
  });
  // const post = new Post({ ...req.body, likes: req.like }); //we are creating a order(const order)
  // // console.log(order);
  // post.save((err, post) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Unable to like post",
  //     });
  //   }
  //   res.json(post);
  // });
};
