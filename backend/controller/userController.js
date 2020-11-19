import User from "../models/User.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password, uniqueName, profilePicSrc } = req.body;

    const userExists = await User.findOne({ email });

    const uniqueNameExist = await User.findOne({ uniqueName });

    if (userExists || uniqueNameExist) {
      res.status(400);
      throw new Error(
        "user or Link name exist already exist line 10 userController.js"
      );
    }

    const user = await User.create({
      name,
      email,
      uniqueName,
      password,
      profilePicSrc,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        uniqueName: user.uniqueName,
        name: user.name,
        email: user.email,
        profilePicSrc: user.profilePicSrc,
        friends: user.friends,
      });
    } else {
      res.status(400);
      throw new Error("failed to create user in database");
    }
  } catch (error) {
    res.status(500).send("userconrtoller line 30 generic error");
  }
};

const getDetails = async (req, res) => {
  try {
    const { _id } = req.headers;

    // when finding an Id, it must be named _id
    const {
      profilePicSrc,
      name,
      uniqueName,
      email,
      friends,
      bio,
    } = await User.findById({ _id });

    res.status(201).json({
      profilePicSrc,
      name,
      uniqueName,
      email,
      _id,
      friends,
      bio,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("no such user");

      res.status(404);
      throw new Error("user not exist");
    } else {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          uniqueName: user.uniqueName,
          name: user.name,
          email: user.email,
          profilePicSrc: user.profilePicSrc,
          friends: user.friends,
        });
      } else {
        console.log("wrong pass clg");

        res.status(404);
        throw new Error("wrong pass");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.headers;

    const {
      newName,
      newEmail,
      newPassword,
      newBio,
      currentPassword,
    } = req.body;

    const user = await User.findById(_id);

    const isMatch = await user.matchPassword(currentPassword);

    if (user && (await user.matchPassword(currentPassword))) {
      user.name = newName !== "" ? newName : user.name;
      user.email = newEmail !== "" ? newEmail : user.email;
      user.password = newPassword !== "" ? newPassword : user.password;
      user.bio = newBio !== "" ? newBio : user.bio;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        uniqueName: updatedUser.uniqueName,
        name: updatedUser.name,
        bio: updatedUser.bio,
        email: updatedUser.email,
        profilePicSrc: updatedUser.profilePicSrc,
        friends: updatedUser.friends,
      });
    } else {
      res.status(404).json({
        message: "Wrong password, try again",
      });
      // throw new Error("wrong password foo");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { registerUser, getDetails, login, updateUser };
