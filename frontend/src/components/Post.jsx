import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

const Post = ({ posterImgSrc, postCaption, posterUniqueName, postImgSrc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  let comments = ["comment 1", "comment2", "com 3"];

  return (
    <Card className="mb-5">
      <Card.Header>
        <Row>
          <Col md={2}>
            <Image src={posterImgSrc} roundedCircle style={{ width: "3rem" }} />
          </Col>
          <Col style={{ paddingTop: "12px", marginLeft: "-20px" }}>
            <Card.Text>
              <h5>{posterUniqueName}</h5>
            </Card.Text>
          </Col>
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
            height: "15rem",
            padding: "0 20px 0 20px",
          }}
        />
      )}

      <Card.Body>
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
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Comment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Row>
                    <Col md={1}>
                      <Image
                        src="https://252radio.com/wp-content/uploads/2016/11/default-user-image.png"
                        roundedCircle
                        style={{ width: "3rem" }}
                      ></Image>
                    </Col>
                    <Col className="px-5">
                      <Form>
                        <Form.Group>
                          <Form.Control as="textarea" rows={6} />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary">Close</Button>
                  <Button variant="primary">Send Comment</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>

            <Button
              style={{ width: "100%" }}
              onClick={() => setIsCommenting(!isCommenting)}
            >
              Comment
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <>
        <Accordion>
          <Card.Header>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                onClick={(e) => {
                  setIsCommentsOpened(!isCommentsOpened);
                }}
              >
                {isCommentsOpened ? "Hide Comments" : "See Comments"}
              </Accordion.Toggle>
            </Card.Header>

            {/* use parenthesis in the methods instead of curly brackets */}
            {comments.map((comment) => (
              <Accordion.Collapse eventKey="0" key={comment} >
                <Card.Body>{comment}</Card.Body>
              </Accordion.Collapse>
            ))}
          </Card.Header>
        </Accordion>
      </>
    </Card>
  );
};

export default Post;
