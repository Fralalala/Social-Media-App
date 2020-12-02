import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import FriendCard from "../components/FriendCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getLoggedInUser,
} from "../actions/userActions";

const FriendsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo, usersFriendsInfo } = userReducer;
  const [initialRun, setInitialRun] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      let id = JSON.parse(localStorage.getItem("token"));
      if (id) {
        dispatch(getLoggedInUser(id));
      } else {
        history.push("/login");
      } 
    } else {
      if (initialRun) {
        dispatch(getFriends(userInfo._id));
        setInitialRun(false)
      }
    }
  }, [userInfo, history, dispatch]);

  return (
    <Container  >

      <h1 className="mb-4">Friend List:</h1>
      
      <Row>
        {usersFriendsInfo.map((friend) => {
          return (
            <Col md={3} key={friend.uniqueName}>
              <FriendCard
                name={friend.name}
                bio={friend.bio}
                profilePicSrc={friend.profilePicSrc}
                uniqueName={friend.uniqueName}
                _id = {friend._id}
              />
            </Col>
          );
        })}
      </Row>

    </Container>
  );
};

export default FriendsScreen;
