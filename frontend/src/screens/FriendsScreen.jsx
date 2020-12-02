import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import FriendCard from "../components/FriendCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriends,
  getFriends,
  getLoggedInUser,
} from "../actions/userActions";

const FriendsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo, usersFriendsInfo } = userReducer;

  const postReducer = useSelector((state) => state.postReducer);
  const { posts } = postReducer;

  const [uniqueName, setUniqueName] = useState("");
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

  const submitHandler = async (e) => {
    e.preventDefault();  
    await dispatch(addFriends(uniqueName, userInfo._id));
    console.log('submit handler getting friends')
    dispatch(getFriends(userInfo._id));
  };

  return (
    <Container  >
      {/* <Row >
        <Col md={4} className="ml-auto">
          <Form onSubmit={submitHandler}>
            <Form.Row className="align-items-center">
              <Col className="my-1">
                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                  Unique Name
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroupUsername"
                    placeholder="Add via Unique Name"
                    value={uniqueName}
                    onChange={(e) => {
                      setUniqueName(e.target.value);
                    }}
                  />
                </InputGroup>
              </Col>
              <Col xs="auto" className="my-1">
                <Button type="submit">Add Friend</Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row> */}

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
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FriendsScreen;
