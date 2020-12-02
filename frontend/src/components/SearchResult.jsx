import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { Button, Card } from "react-bootstrap";
import { addFriends, getFriends } from "../actions/userActions";

const SearchResult = ({ name, _id, profilePicSrc }) => {

  const userReducer = useSelector(state => state.userReducer)
  const {userInfo} = userReducer

  const dispatch = useDispatch()

  const [resultId, setResultId] = useState(_id.$oid)

  useEffect(() => {
    
    console.log('asd`')

  }, [])

  return (
    <Card style={{ width: "15rem" }} className="m-2">
      <Card.Img src={profilePicSrc} />

      <Card.Body style={{ paddingBottom: "0" }}>
        <Card.Title style={{ textAlign: "center" }}>
          <h4 style={{ display: "inline" }}>{name}</h4>
        </Card.Title>
        <Button
          style={{ width: "100%" }}

          onClick={async () => {
            console.log(_id)
            await dispatch(addFriends(userInfo._id, resultId));

            dispatch(getFriends(userInfo._id));
          }}
        >
          <i className="fas fa-user-plus"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SearchResult;
