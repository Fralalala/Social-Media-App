import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const friendsSchema = mongoose.Schema({
  friendId: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uniqueName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicSrc: {
      type: String,
      required: true,
      default:
        "https://252radio.com/wp-content/uploads/2016/11/default-user-image.png",
    },
    profilePicKey : {
      type: String,
      default: ""
      // required: true
    },
    bio: {
      type: String,
      default: `Hi! Im a good person` 
    },
    friends: {
      type: Array,
      default: []
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {

  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

userSchema.pre("save", async function (next) {
  //func part of mongoose
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
 