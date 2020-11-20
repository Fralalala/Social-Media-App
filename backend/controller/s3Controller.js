const upload = async (req, res) => {
  try {
    return res.json({
      status: "File is uploaded",
      imgSrc: req.file.location,
      imgKey: req.file.key,
    });
  } catch (error) {
    res.status(500).send("something wen wrong :/");
  }
};

const del = async(req, res) => {
    
  res.json({
    msg: "done",
  });
}

export {upload, del} 