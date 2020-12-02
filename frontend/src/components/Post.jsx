import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPost } from "../actions/postAction";
import axios from 'axios'

const Post = ({
  postCaption,
  postImgSrc,
  postImgKey,
  posterId,
  _id
}) => {
  // const postReducer = useSelector((state) => state.postReducer);
  // const { posts, loading } = postReducer;

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const [posterName, setPosterName] = useState('Loading name...')
  const [posterImgSrc, setPosterImgSrc] = useState('')

  useEffect( () => {

    //if using axios, must be put in a container and then run the said container

    const getPoster = async () => {

      const config = {
        headers: {
          "Content-Type" : "application/json",
          _id : posterId
        }
      }

      const {data: {name, profilePicSrc} } = await axios.get("api/users", config)

    setPosterName(name)
    setPosterImgSrc(profilePicSrc)
    }

    getPoster()
    
 
  }, [posterId]);

  return (
    <Card className="mb-5">
      <Card.Header>
        <Row>
          <Col  md="auto" >

            <Avatar src={posterImgSrc} size="45px" round />
          </Col>

          <Col>
            <Card.Text style={{verticalAlign: "middle"}} >
              <p style={{marginBottom: "0", fontStyle: "italic"}} > {posterName} </p>
              {/* <p style={{margin: "0", padding: "0", fontSize: "12px", color: "gray", fontStyle: "italic"}} >date this is posted</p> */}
            </Card.Text>
          </Col>
          <Dropdown className="ml-auto mr-3" hidden={toString(userInfo._id) === toString(posterId)} >
            <Dropdown.Toggle id="dropdown-basic" /> 

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={async () => {

                  await dispatch(deletePost(postImgKey, _id));

                  if (window.location.pathname === "/") {
                    dispatch(getAllPost(userInfo.friends, userInfo.uniqueName));
                  } else {
                    dispatch(getAllPost([], userInfo.uniqueName));
                  }
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      </Card.Header>

      <Card.Text className="px-4 pt-2">
        {postCaption ? postCaption : ""}
      </Card.Text>

      {postImgSrc && (
        <Card.Img
          src={postImgSrc}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "20rem",
            padding: "0 20px 0 20px",
          }}
          className="postImg"
          onClick={() => {
            setIsCommenting(true);
          }}
        />
      )}

      <Card.Body style={{ background: "#373a40" }}>
        <Row>
          <Col md={6}>
            <Button
              type="button"
              style={{ width: "100%" }}
              onClick={(e) => {
                setIsLiked(!isLiked);
              }}
            >
              <i className={isLiked ? "fa fa-heart" : "far fa-heart"}></i>
            </Button>
          </Col>
          <Col>
            <Modal
              show={isCommenting}
              onHide={() => setIsCommenting(false)}
              size={"xl"}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title>Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image src={postImgSrc} fluid />
              </Modal.Body>
            </Modal>

            <Button
              style={{ width: "100%" }}
              onClick={() => setIsCommenting(!isCommenting)}
              disabled
            >
              Comment
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
