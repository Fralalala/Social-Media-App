import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { v4 as uuid } from "uuid";

let cred = new aws.Credentials({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3({ apiVersion: "2006-03-01", credentials: cred });

const uploadObject = multer({
  storage: multerS3({
    s3: s3,
    bucket: "socmedbucket2",
    metadata: (req, res, callback) => {
      callback(null, { fieldName: res.fieldname }); 
    },
    key: (req, res, callback) => {
      const ext = path.extname(res.originalname);
      const objKey = `${uuid()}${ext}`;
      callback(null, objKey);
    },
    credentials: cred,
  }),
}).single("image");

const deleteObject = async (req, res, next) => {
  console.log(req.headers);

  const { postimgkey } = req.headers;

  

  var params = {
    Bucket: "socmedbucket2",
    Key: postimgkey, 
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  next();
};

export { deleteObject, uploadObject };
