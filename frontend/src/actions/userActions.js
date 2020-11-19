import axios from "axios";
import {
  ADD_USER_FRIENDS_FAIL,
  ADD_USER_FRIENDS_REQUEST,
  ADD_USER_FRIENDS_SUCCESS,
  DELETE_USER_FRIENDS_FAIL,
  DELETE_USER_FRIENDS_REQUEST,
  DELETE_USER_FRIENDS_SUCCESS,
  GET_USER_FRIENDS_FAIL,
  GET_USER_FRIENDS_REQUEST,
  GET_USER_FRIENDS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const register = (
  name,
  email,
  password,
  uniqueName,
  profilePicSrc
) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password, uniqueName, profilePicSrc },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("token", JSON.stringify(data._id));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

export const getLoggedInUser = (_id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        _id,
      },
    };

    //you dont put a body in a request, it may work in postman but not in code
    //this is the get request in userRoutes
    const { data } = await axios.get("api/users", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("token", JSON.stringify(data._id));
  } catch (error) {
    alert("Wrong Pass or Email");

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const getFriends = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_FRIENDS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        _id,
      },
    };

    const {
      data: { myFriends },
    } = await axios.get("api/users/friends", config);

    dispatch({
      type: GET_USER_FRIENDS_SUCCESS,
      payload: myFriends,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_USER_FRIENDS_FAIL,
    });
  }
};

export const addFriends = (uniqueName, _id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_FRIENDS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        _id,
      },
    };

    const { data } = await axios.post(
      "api/users/friends",
      { uniqueName },
      config
    );

    dispatch({
      type: ADD_USER_FRIENDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_USER_FRIENDS_FAIL,
    });
  }
};

export const deleteFriends = (_id, friendUniqueName) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_FRIENDS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        _id,
        friendUniqueName,
      },
    };

    const { data } = await axios.delete("api/users/friends", config);

    dispatch({
      type: DELETE_USER_FRIENDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_USER_FRIENDS_FAIL,
    });
  }
};

export const updateUser = (
  _id,
  newName,
  newEmail,
  newBio,
  newPassword,
  currentPassword
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        _id,
      },
    };

    const { data } = await axios.put(
      "api/users",
      { newName, newEmail,newBio, newPassword, currentPassword },
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    alert("Info has been Updated")

  } catch (error) {



    console.error(error);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error,
    });
  }
};
