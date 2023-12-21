const mongoose = require("mongoose");

const semesterFeeSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
  },
  admissionFee: {
    type: String,
    required: true,
  },
  tutionFee: {
    type: String,
    required: true,
  },
  libraryFee: {
    type: String,
    required: true,
  },
  internalExamFee: {
    type: String,
    required: true,
  },
  boardExamFee: {
    type: String,
    required: true,
  },
  infrastructureDevelopmentFee: {
    type: String,
    required: true,
  },
  labFee: {
    type: String,
    required: true,
  },
  identityCardFee: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SemesterFee", semesterFeeSchema);
