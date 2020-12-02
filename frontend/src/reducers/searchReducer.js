import {
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "../constants/searchConstant.js";

export const searchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_SUCCESS:
      return {
        results: action.payload,
        loading: false,
      };

    case SEARCH_FAIL:
      return {
        results: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
