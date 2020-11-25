import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../actions/userActions";
import { getAllPost, post, uploadFile } from "../actions/postAction";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const postReducer = useSelector((state) => state.postReducer);
  const { posts } = postReducer;

  const [profilePic, setProfilePic] = useState(
    "https://252radio.com/wp-content/uploads/2016/11/default-user-image.png"
  );
  const [caption, setCaption] = useState("");
  const [images, setImage] = useState([]);
  const [bio, setBio] = useState("Loading Bio...");

  const fileInput = useRef()

  useEffect(() => {
    if (!userInfo) {
      let id = JSON.parse(localStorage.getItem("token"));

      if (id) {
        dispatch(getLoggedInUser(id));
      } else {
        history.push("/login");
      }
    } else {
      setProfilePic(userInfo.profilePicSrc);
      dispatch(getAllPost([], userInfo.uniqueName));
      setBio(userInfo.bio);
    }
  }, [userInfo, dispatch, history]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (caption.replaceAll(" ", "").length > 0 || images.length > 0) {
      await dispatch(
        post(
          userInfo.profilePicSrc,
          userInfo._id,
          caption,
          userInfo.name,
          userInfo.uniqueName,
          images
        )
      );

      fileInput.current.value = ""

      setCaption("");
      setImage([])

      dispatch(getAllPost([], userInfo.uniqueName));
    } else {
      alert("Please Enter a Caption or an Image")
    }
  };

  return (
    <Container>
      <Row
        className="p-3 rounded "
        style={{ backgroundColor: "#393e46", marginBottom: "35px" }}
      >
        <Col md={2}>
          <Image src={profilePic} rounded style={{ width: "11rem" }} />
        </Col>
        <Col className="px-5" md={10}>
          <Row>
            <Col md={12}>
              <Form
                // action="api/post"
                // // method="POST"
                // encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.File
                        type="file"
                        id="image"
                        name="image"
                        ref = {fileInput}
                        onChange={(e) => {
                          setImage(e.target.files);
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Button
                      type="submit"
                      style={{ float: "right", width: "9rem" }}
                    >
                      Post
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>{bio}</Card.Body>
          </Card>

          {/* <Image
            src="https://cdna.artstation.com/p/assets/images/images/011/935/010/large/nicholas-kole-img-6296-copy.jpg?1532181241"
            rounded
            style={{ width: "100%" }}
          /> */}
        </Col>
        <Col md={8} className="ml-auto">
          {posts.length < 1 && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Text>You have No posts</Card.Text>
              </Card.Body>
            </Card>
          )}
          {posts.map((post) => {
            return (
              <Post
                postImgSrc={post.postImgSrc}
                posterUniqueName={post.posterUniqueName}
                postCaption={post.postCaption}
                posterImgSrc={post.posterImgSrc}
                postImgKey={post.postImgKey}
                posterName={post.posterName}
                _id={post._id}
                key={post._id}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
