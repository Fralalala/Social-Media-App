import React from "react";
import {useDispatch, useSelector} from "react-redux"

import { Button, Card } from "react-bootstrap";

const SearchResult = ({name, _id, profilePicSrc}) => {



  return (
    <Card style={{ width: "15rem" }} className="m-2">
      <Card.Img src={profilePicSrc}  />

      <Card.Body style= {{paddingBottom: '0'}} >
        <Card.Title style={{ textAlign: "center" }}>
          <h4 style={{ display: "inline" }}>{name}</h4>
        </Card.Title>
          <Button
            style={{width: "100%", }}

            // onClick={async () => {
            //   await dispatch(deleteFriends(userInfo._id, uniqueName));

            //   dispatch(getFriends(userInfo._id));
            // }}
          >
            <i className="fas fa-user-plus"></i>
          </Button>
      </Card.Body>
    </Card>
  );
};

export default SearchResult;
