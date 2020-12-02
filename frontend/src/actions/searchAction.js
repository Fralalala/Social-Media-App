import axios from "axios";
import { SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS } from "../constants/searchConstant";

export const searchUsers = (text) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REQUEST });

    let path =
      "https://webhooks.mongodb-realm.com/api/client/v2.0/app/socmed-qifbg/service/search_users/incoming_webhook/getUsers";

    // path = path.concat(text)

    

    const {data} = await axios.get(path,{params: {arg : text}})

    dispatch({
        type: SEARCH_SUCCESS,
        payload: data
    })

  } catch (error) {
      dispatch({type: SEARCH_FAIL, payload: error})
  }
};
