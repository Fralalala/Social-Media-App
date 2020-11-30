import axios from "axios";
import {
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  POST_FAIL,
  POST_REQUEST,
  POST_SIGN_OUT,
  POST_SUCCESS,
} from "../constants/postConstant";
import { USER_SIGN_OUT } from "../constants/userConstants";

export const getAllPost = (friends, _id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        friends,
        _id,
      },
    };

    const { data } = await axios.get("api/post", config);

    dispatch({
      type: GET_POST_SUCCESS,
      payload: data.allPosts,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error,
    });
  }
};

export const post = (
  posterImgSrc,
  posterId,
  postCaption,
  posterName,
  posterUniqueName,
  images
) => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let tempImgSrc;
    let tempImgKey;

    //Upload to s3 bucket
    if (images.length !== 0) {
      let formData = new FormData();

      formData.append("image", images[0], images[0].name);

      const {
        data: { imgSrc, imgKey },
      } = await axios.post("/api/s3", formData);

      tempImgSrc = imgSrc;
      tempImgKey = imgKey;
    }

    const { data } = await axios.post(
      "api/post",
      {
        posterImgSrc,
        posterId,
        postCaption,
        posterName,
        posterUniqueName,
        postImgSrc: tempImgSrc ? tempImgSrc : "",
        postImgKey: tempImgKey ? tempImgKey : "",
      },
      config
    );

    dispatch({
      type: POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_FAIL,
      payload: error,
    });
  }
};

export const deletePost = (postImgKey, _id) => async (dispatch) => {
  //delete img in s3

  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });

    const config = {
      headers: {
        postImgKey,
        _id,
      },
    };

    const { data } = await axios.delete("/api/post", config);

    dispatch({
      type: DELETE_POST_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error,
    });
  }
  //delete post in atlas
};

export const logout = () => async(dispatch) => {
  await dispatch({
    type:USER_SIGN_OUT
  })
  dispatch({
    type:POST_SIGN_OUT
  })

  localStorage.removeItem('token')

}