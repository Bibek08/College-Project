const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // filename
  },
});

const upload = multer({ storage });

module.exports = upload;
