import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, updateUser } from "../actions/userActions";

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const [email, setEmail] = useState("");
  // const [initialEmail, setInitialEmail] = useState("random@email");

  const [password, setPassword] = useState("");
  // const [initialPassword, setInitialPassword] = useState("somePassword");

  const [name, setName] = useState("");
  // const [initialName, setInitialName] = useState("someName");

  const [bio, setBio] = useState("");
  // const [initialBio, setInitialBio] = useState("someBio");

  const [images, setImages] = useState(null);

  const [userProfilePicSrc, setUserProfilePicSrc] = useState(
    "https://252radio.com/wp-content/uploads/2016/11/default-user-image.png"
  );

  const [userBio, setUserBio] = useState(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,perferendis"
  );

  const [cardUserName, setCardUserName] = useState('Loading....')

  const [currentPassword, setCurrentPassword] = useState();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    //YO YOU JUST NEED TO ADD THE CURRENT USERS PROFILE PIC IMG KEY, CURRENTLY NO ACCOUNTS
    //HAVE AN IMG KEY FOR THEIR PROFILE PICTURES

    dispatch(
      updateUser(userInfo._id, name, email, bio, password, currentPassword, images, userInfo.profilePicKey)
    );
  };

  useEffect(() => {
    if (!userInfo) {
      let id = JSON.parse(localStorage.getItem("token"));

      if (id) {
        dispatch(getLoggedInUser(id));
      } else {
        history.push("/login");
      }
    } else {
      setUserProfilePicSrc(userInfo.profilePicSrc);
      setUserBio(userInfo.bio);
      setCardUserName(userInfo.name)
    }
  }, [userInfo, history, dispatch]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>Update Info</h3>

          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>
                    New Full Name
                    {isEditingName ? <i> --Editing Name</i> : ""}
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter New Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditingName}
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              >
                <Button
                  onClick={(e) => {
                    setIsEditingName(!isEditingName);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>
                    New Email
                    {isEditingEmail ? <i> --Editing Email</i> : ""}
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditingEmail}
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              >
                <Button
                  onClick={(e) => {
                    setIsEditingEmail(!isEditingEmail);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>
                    New Bio
                    {isEditingBio ? <i> --Editing Bio</i> : ""}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter New Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditingBio}
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              >
                <Button
                  onClick={(e) => {
                    setIsEditingBio(!isEditingBio);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>
                    New Password
                    {isEditingPassword ? <i> --Editing Password</i> : ""}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditingPassword}
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              >
                <Button
                  onClick={(e) => {
                    setIsEditingPassword(!isEditingPassword);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>Select New Profile Picture</Form.Label>
                  <Form.File
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setImages(e.target.files)}
                  ></Form.File>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              ></Col>
            </Row>

            <Row>
              <Col md={10}>
                <FormGroup>
                  <Form.Label>Enter Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col
                md={2}
                style={{
                  alignContent: "center",
                  margin: "auto",
                  paddingTop: "11px",
                }}
              ></Col>
            </Row>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Col>

        <Col md={3}>
          <Card style={{ width: "17rem" }}>
            <Button
              type="submit"
              variant="primary"
              className="mr-2 mt-2"
              style={{ position: "absolute", right: "0" }}
            >
              <i className="fas fa-edit"></i>
            </Button>

            <Card.Img src={userProfilePicSrc} />

            <Card.Body style={{}}>
              <Card.Title className="" style={{ textAlign: "center" }}>
                <h4> {cardUserName} </h4>
              </Card.Title>
              {userBio}
              {/* <div style={{ marginTop: "5px" }}>Joined since ...</div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button onClick={() => {
        
      }}>
        make img key of current profile
      </Button>

      <Row className="mt-5">
        <Col className="border border-right-0 border-danger p-4" md={3}>
          <h4 md={6}>Delete Account?</h4>
        </Col>

        <Col className="border  border-left-0 border-danger p-4" md={3}>
          <Button
            style={{ display: "block", marginLeft: "auto" }}
            md={6}
            onClick={(e) => {
              setIsEditingPassword(!isEditingPassword);
            }}
          >
            <i className="fas fa-user-slash"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsScreen;
