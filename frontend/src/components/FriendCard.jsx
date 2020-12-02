import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriends, getFriends, getLoggedInUser } from "../actions/userActions";

const FriendCard = ({ name, bio, profilePicSrc, uniqueName, history, _id }) => {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  // const postReducer = useSelector((state) => state.postReducer);
  // const { posts } = postReducer;

  useEffect(() => {
    if (!userInfo) {
      let id = JSON.parse(localStorage.getItem("token"));

      if (id) {
        dispatch(getLoggedInUser(id));
      } else {
        history.push("/login");
      }
    }
  }, [userInfo, history, dispatch]);

  return (
    <Card style={{ width: "15rem" }} className="mb-2">
      <Card.Img src={profilePicSrc} />

      <Card.Body style={{}}>
        <Card.Title className="" style={{ textAlign: "center" }}>
          <h4 style={{ display: "inline" }}>{name}</h4>
          <Button
            className="ml-3"
            onClick={async() => {
              await dispatch(deleteFriends(userInfo._id, _id));

              dispatch(getFriends(userInfo._id));
            }}
          >
            <i className="fas fa-user-minus"></i>
          </Button>
        </Card.Title>
        {bio}
      </Card.Body>
    </Card>
  );
};

export default FriendCard;
