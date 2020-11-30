import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FormGroup,
  Spinner,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const pixelRatio = window.devicePixelRatio || 1;

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [imageName, setImageName] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 1,
  });

  const [canvasBlob, setCanvasBlob] = useState();

  useEffect(async () => {
    if (userInfo) {
      history.push("/");
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
                setImageUrl("");
                return;
              }
              blob.name = imageName;
              // console.log(blob);
              resolve(blob);
              setImageUrl(canvas.toDataURL("image/jpeg"));
            },
            "image/jpeg",
            1
          );
        })
      );
    }

    //#endregion
  }, [userInfo, completedCrop, history, imageName]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      setIsRegistering(false);

      if(image === null) {
        alert("Crop before Registering")
      } else {
        dispatch(register(name, email, password, uniqueName, image));
        
      }

    }
  };

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
    <Container className="mt-4 ">
      <Row>
        <Col md={6}>
          <h1>Create an Account</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Unique Link Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Unique Name"
                value={uniqueName}
                onChange={(e) => {
                  setUniqueName(e.target.value);
                }}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              ></Form.Control>
            </FormGroup>

            <FormGroup>
              <Form.Label>Profile Pic File</Form.Label>
              <Form.File
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  onSelectFile(e);
                  setImageName(e.target.files[0].name);
                }}
                required
              ></Form.File>
            </FormGroup>

            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>

            <Button type="submit" variant="primary">
              Register
              <Spinner animation="grow" hidden={isRegistering} />
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
                maxHeight: "250px"
              }}
            />
          </div>

          <Button
            onClick={() => {
              console.log(image);
            }}
          >
            Button
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="mt-4">
          Have an Account?
          <Link to="/login"> Sign in Here </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
