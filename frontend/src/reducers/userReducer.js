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
  USER_SIGN_OUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userReducer = (state = { usersFriendsInfo: [] }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_DETAILS_REQUEST:
    case USER_REGISTER_REQUEST:
    case GET_USER_FRIENDS_REQUEST:
    case ADD_USER_FRIENDS_REQUEST:
    case DELETE_USER_FRIENDS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
    case USER_DETAILS_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case ADD_USER_FRIENDS_SUCCESS:
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case DELETE_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case GET_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersFriendsInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
    case USER_DETAILS_FAIL:
    case USER_REGISTER_FAIL:
    case GET_USER_FRIENDS_FAIL:
    case ADD_USER_FRIENDS_FAIL:
    case DELETE_USER_FRIENDS_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_SIGN_OUT:
      return {
        usersFriendsInfo: []
      }

    default:
      return state;
  }
};
