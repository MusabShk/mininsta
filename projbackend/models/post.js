var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 32,
    },
    body: {
      type: String,
      required: true,
      maxlength: 300,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
