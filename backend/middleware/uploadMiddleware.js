const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
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

const convertToBase64AndSave = async (req, file) => {
  try {
    const imagePath = path.join(__dirname, "..", "uploads", file.filename);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");

    //? Save the base64 image in MongoDB
    const Payment = mongoose.model("payment");
    const newPayment = new Payment({
      name: req.body.name,
      address: req.body.address,
      semester: req.body.semester,
      parentsName: req.body.parentsName,
      photo: base64Image, // save the base64 image string
      amount: req.body.amount,
      paymentDate: req.body.paymentDate,
      email: req.body.email,
      guardianContact: req.body.guardianContact,
    });

    // Validate teh payment instance
    await newPayment.validate();

    // Save teh payemnt instance
    await newPayment.save();

    return base64Image;
  } catch (error) {
    throw error;
  }
};

const uploadMiddleware = (req, res, next) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const base64Image = await convertToBase64AndSave(req, req.file);
      req.file.base64Image = base64Image; //? Attach base64 image to the request Object
      next();
    } catch (error) {
      console.error("Error processing image:", error);
      return res
        .status(500)
        .json({ error: "Error processing image", details: error.message });
    }
  });
};
module.exports = uploadMiddleware;
