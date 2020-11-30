import React, { useState, useEffect, Fragment } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { getLoggedInUser } from "../actions/userActions";
import { getAllPost } from "../actions/postAction";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const postReducer = useSelector((state) => state.postReducer);
  const { posts } = postReducer;

  const [profilePicture, setProfilePicture] = useState(
    "https://252radio.com/wp-content/uploads/2016/11/default-user-image.png"
  );

  const [name, setName] = useState("Loading name...");

  useEffect(() => {
    if (!userInfo) {
      let id = JSON.parse(localStorage.getItem("token"));

      if (id) {
        dispatch(getLoggedInUser(id));
      } else {
        history.push("/login");
      }
    } else {
      dispatch(getAllPost(userInfo.friends, userInfo._id));
      setProfilePicture(userInfo.profilePicSrc);
      setName(userInfo.name);
    }
  }, [userInfo, dispatch, history]);

  return (
    <Container>
      <Row>
        <Col md="auto">
          <Card className="mb-3">
            <Card.Body>
              <Image
                src={profilePicture}
                alt="somethign wen wrong"
                rounded
                style={{ width: "11rem" }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          {posts.length === 0 && (
            <Fragment>
              <Col md={9}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Text>No Post</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Fragment>
          )}

          {posts.length > 0 ? (
          posts.map((post) => {
              return (
                <Post
                  postImgSrc={post.postImgSrc}
                  // posterUniqueName={post.posterUniqueName}
                  postCaption={post.postCaption}
                  postImgKey={post.postImgKey}
                  posterId = {post.posterId}
                  _id={post._id}
                  key={post._id}
                />
              );
            })
          ) : (
            <> </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
