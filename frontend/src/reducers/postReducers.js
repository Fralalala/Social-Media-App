import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  POST_FAIL,
  POST_REQUEST,
  POST_SUCCESS,
} from "../constants/postConstant";

export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...action.payload],
      };

    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };

    case GET_POST_FAIL:
    case POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
