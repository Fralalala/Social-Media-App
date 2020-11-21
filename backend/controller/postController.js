import Post from "../models/Post.js";

const getPosts = async (req, res) => {
  try {
    const { friends, useruniquename } = req.headers;

    let myFriends = friends.split(",");

    let allPosts = [];

    let friendsPosts = [];

    friendsPosts = await Post.find({
      posterUniqueName: { $in: [...myFriends, useruniquename] },
    }).sort("-createdAt");

    allPosts = [...allPosts, ...friendsPosts];

    res.status(200).json({
      allPosts,
    });
  } catch (error) {
    res.status(501).send("wtf is happening");
  }
};

const makePost = async (req, res) => {
  try {
    const {
      posterImgSrc,
      posterId,
      postCaption,
      posterName,
      posterUniqueName,
      postImgSrc,
      postImgKey,
    } = req.body;

    const post = await Post.create({
      posterImgSrc,
      posterId,
      postImgSrc,
      postCaption,
      posterName,
      posterUniqueName,
      postImgKey,
      comments: [],
    });

    if (post) {
      res.status(201).json({
        id: post._id,
        posterImgSrc: post.posterImgSrc,
        posterId: post.posterId,
        postImgSrc: post.postImgSrc,
        postCaption: post.postCaption,
        posterName: post.posterName,
        posterUniqueName: post.posterUniqueName,
        postImgKey: post.postImgKey,
        comments: [],
      });
    } else {
      res.status(400);
      throw new Error("failed to create post to database");
    }
  } catch (error) {
    res
      .status(500)
      .send(
        "postController line 31 generic error, something jsut went wrong, check ur inputs and code in controller"
      );
  }
};

const delPost = async (req, res) => {
  try {
    const { _id } = req.headers;

    const post = await Post.findByIdAndDelete(_id);

    res.status(201).json({
      msg: "Delete is a success"
    })

  } catch (error) {
    res.status(500).send("smething went wrong in deleting a post");
  }
};

export { makePost, getPosts, delPost };
