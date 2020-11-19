import axios from "axios";
import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  POST_FAIL,
  POST_REQUEST,
  POST_SUCCESS,
} from "../constants/postConstant";

export const getAllPost = (friends, uniqueName) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    const config = { 
      headers: {
        "Content-Type": "application/json",
        friends,
        userUniqueName: uniqueName,
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

    let formData = new FormData();

    formData.append("image", images[0], images[0].name);

    const {
      data: { imgSrc },
    } = await axios.post("/api/upload", formData);
    
    const { data } = await axios.post(
      "api/post",
      {
        posterImgSrc,
        posterId,
        postCaption,
        posterUniqueName,
        postImgSrc: imgSrc ? imgSrc : "",
      },
      config
    );

    dispatch({
      type: POST_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.error(error)
    dispatch({
      type: POST_FAIL,
      payload: error,
    });
  }
};