import User from "../models/User.js";
const addFriends = async (req, res) => {
  try {
    const { _id } = req.headers;

    const { uniqueName } = req.body;

    const user = await User.findById(_id);

    const friend = await User.findOne({ uniqueName });

    if (!friend || !user) {
      res.status(404);
      throw new Error("user ");
    } else {
      for (let index = 0; index < user.friends.length; index++) {
        if (user.friends[index] === friend.uniqueName) {
          res.status(500);
          throw new Error("already a friend");
          break;
        }
      }

      user.friends = [...user.friends, friend.uniqueName];

      const updatedUser = await user.save();

      // const { friends } = updatedUser;

      res.json({
        profilePicSrc: updatedUser.profilePicSrc,
        bio: updatedUser.profilePicSrc,
        friends: updatedUser.friends,
        _id: updatedUser._id,
        name: updatedUser.name,
        uniqueName: updatedUser.uniqueName,
         email: updatedUser.email
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getFriends = async (req, res) => {
  try {
    const { _id } = req.headers;

    const { friends } = await User.findById(_id);

    let myFriends = await User.find({
      uniqueName: { $in: [...friends] },
    }).select("name bio profilePicSrc uniqueName");

    // myFriends = myFriends.length < 1 ? myFriends : ['You have no friends :/    '] 

    res.status(201).json({
      myFriends,
    });
  } catch (error) {
    res.status(501).send("wtf is happening");
  }
};

const deleteFriends = async (req, res) => {
  try {
    //Headers are always lowercase
    const { _id, frienduniquename } = req.headers;

    const user = await User.findById(_id);

    if (user) {
      let index = user.friends.indexOf(frienduniquename);
      user.friends.splice(index, 1);

      const updatedUser = user.save();

      res.status(201).json({
       profilePicSrc: updatedUser.profilePicSrc,
       bio: updatedUser.profilePicSrc,
       friends: updatedUser.friends,
       _id: updatedUser._id,
       name: updatedUser.name,
       uniqueName: updatedUser.uniqueName,
        email: updatedUser.email
      });
    } else {
      res.status(501).send("LAALALLA");
    }
  } catch (error) {
      console.log(error)
    res.status(500).send(error);
  }
};
  

export { getFriends, addFriends , deleteFriends};
