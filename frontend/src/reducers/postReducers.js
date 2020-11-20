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

export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
    case POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
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
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case POST_SIGN_OUT:
      return {
        posts: [],
      };

    default:
      return state;
  }
};
