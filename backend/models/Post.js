import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  commentImgSrc: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const postSchema = mongoose.Schema(
  //add the normal name of the poster

  {
    posterImgSrc: {
      type: String,
      required: true,
    },
    posterId: {
      type: String,
      required: true,
    },
    posterName: {
      type: String,
      required: true,
    },
    posterUniqueName: {
      type: String,
      required: true,
    },
    postImgSrc: {
      type: String,
    },
    postCaption: {
      type: String,
    },
    postImgKey: {
      type: String,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

export default Post;
