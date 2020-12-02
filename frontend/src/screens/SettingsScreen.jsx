import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, updateUser } from "../actions/userActions";
import ReactCrop from "react-image-crop";

const pixelRatio = window.devicePixelRatio || 1;

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState([]);

  const [userProfilePicSrc, setUserProfilePicSrc] = useState(
    "https://252radio.com/wp-content/uploads/2016/11/default-user-image.png"
  );

  const [userBio, setUserBio] = useState(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,perferendis"
  );

  const [cardUserName, setCardUserName] = useState("Loading....");

  const [currentPassword, setCurrentPassword] = useState();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const previewCanvasRef = useRef();
  const [imageName, setImageName] = useState();
  const [image, setImage] = useState();

  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 1,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    await dispatch(
      updateUser(
        userInfo._id,
        name,
        email,
        bio,
        password,
        currentPassword,
        image,
        userInfo.profilePicKey
      )
    );

    setIsSubmitting(false);
  };

  useEffect(async () => {
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
      setCardUserName(userInfo.name);
    }

    //#region on complete crop

    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    } else {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      setImage(
        await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                //reject(new Error('Canvas is empty'));
                // console.error("Canvas is empty");
                resolve(null);
                return;
              }
              blob.name = imageName;
              // console.log(blob);
              resolve(blob);
            },
            "image/jpeg",
            1
          );
        })
      );
    }

    //#endregion

  }, [userInfo, history, dispatch, imageName, completedCrop]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      //reader.result is the data url, in this case : img Url
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      console.log("object");
    }
  };

  const onLoad = useCallback((img) => {
    console.log(img);
    imgRef.current = img;
  }, []);

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
                    onChange={(e) => {
                      onSelectFile(e);
                      setImageName(e.target.files[0].name);
                      setImages(e.target.files)
                    }}
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
              <Spinner
                animation="grow"
                hidden={!isSubmitting}
                style={{ verticalAlign: "middle" }}
              />
              Save Changes
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <ReactCrop
            src={upImg}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onLoad}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />

          <div>
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
                minWidth: "250px",
                minHeight: "250px",
                maxWidth: "250px",
                maxHeight: "250px",
              }}
            />
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default SettingsScreen;
