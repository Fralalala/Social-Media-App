import express from "express";
import {
  addFriends,
  deleteFriends,
  getFriends,
} from "../controller/friendsController.js";
import {
  getDetails,
  login,
  registerUser,
  updateUser,
} from "../controller/userController.js";
const router = express.Router();

//update to /register, /getUser in the future
router
  .route("/")
  .post(registerUser) //regiser a user
  .get(getDetails) //get user details
  .put(updateUser); //update user

router.route("/login").post(login);

router
  .route("/friends")
  .get(getFriends)
  .post(addFriends) //add friends using uniqueNames
  .delete(deleteFriends);

export default router;
