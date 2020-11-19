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
import axios from "axios";
import aws from "aws-sdk";
import fs from "fs";

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
  const [images, setImage] = useState();

  const myRef = useRef(null);

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
    }
  }, [userInfo, dispatch, history]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      post(
        userInfo.profilePicSrc,
        userInfo._id,
        caption,
        userInfo.uniqueName,
        images
      )
    );
  };

  return (
    <Container>
      <Row
        className="p-3 rounded "
        style={{ backgroundColor: "#393e46", marginBottom: "35px" }}
      >
        <Col md={2}>
          <Image src={profilePic} roundedCircle style={{ width: "12rem" }} />
        </Col>
        <Col className="px-5" md={10}>
          <Row>
            <Col md={12}>
              <Form
                action="api/post"
                method="POST"
                encType="multipart/form-data"
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

                <Form.Group>
                  <Form.File
                    type="file"
                    id="image"
                    label="this is a label"
                    name="image"
                    ref={myRef}
                    onChange={(e) => {
                      setImage(e.target.files);
                      console.log(e.target.files);
                    }}
                  />
                </Form.Group>
                <Button type="submit" className="ml-auto ">
                  Post
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi id,
              quisquam aut consectetur nam accusantium nulla impedit
              voluptatibus error natus.
            </Card.Body>
          </Card>

          <Image
            src="https://cdna.artstation.com/p/assets/images/images/011/935/010/large/nicholas-kole-img-6296-copy.jpg?1532181241"
            rounded
            style={{ width: "100%" }}
          />
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