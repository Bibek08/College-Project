const mongoose = require("mongoose");

const semesterFeeSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
  },
  admissionFee: {
    type: Number,
    required: true,
  },
  tutionFee: {
    type: Number,
    required: true,
  },
  libraryFee: {
    type: Number,
    required: true,
  },
  internalExamFee: {
    type: Number,
    required: true,
  },
  boardExamFee: {
    type: Number,
    required: true,
  },
  infrastructureDevelopmentFee: {
    type: Number,
    required: true,
  },
  labFee: {
    type: Number,
    required: true,
  },
  identityCardFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SemesterFee", semesterFeeSchema);
