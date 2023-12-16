const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const Accountant = require("../models/accountantSchema");
const generateToken = require("../utils/generateToken");
const admin = require("../models/adminSchema");
const payment = require("../models/payment");
const SemesterFee = require("../models/semesterFeeStructure");
// const io = require("socket.io");
const Notification = require("../models/NotificationSchema");

//  @desc   Auth user & get token
//  @route  POST /auth
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.json({ message: "All fields are required", success: false });
  }
  if (email === admin.email && password === admin.password) {
    generateToken(res, Admin._id);
    return res.status(200).json({
      _id: Admin._id,
      name: Admin.name,
      role: Admin.role,
      message: "Admin login successfull",
      success: true,
    });
  }

  try {
    const userTypes = [User, Accountant];

    let user = null;

    // Check if the user is an admin
    // const adminUser = await Admin.find(
    //   (adminUser) =>
    //     adminUser.email === email && adminUser.password === password,
    // );

    //  Check if the user is a user or accountant
    for (const UserTypes of userTypes) {
      user = await UserTypes.findOne({ email });
      if (user) break;
    }

    if (!user) {
      return res.json({ message: "No user found " });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.json({ message: "Incorrect password" });
    } else {
      generateToken(res, user._id);

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.constructor.modelName,
        message: "Successfully logged in",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Register a new user or accountant
// @route   POST /api/registerStudent
// @access  Private
const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, roll, guardianName, contact, CreatedAt } =
      req.body;

    //  Check either student exists or not
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.json({ error: "Student already exists" });
    }

    //  if not create Student
    const createStudent = await User.create({
      name,
      roll,
      email,
      guardianName,
      contact,
      password,
      CreatedAt,
    });

    if (createStudent) {
      // assign token with the id from mongoose
      generateToken(res, createStudent._id);

      console.log(createStudent); // check whether the token and student is created
      res.status(201).json({
        message: "Student created successfully",
        success: true,
        createStudent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured while creating the post" });
  }
});

//  @desc       Get student
//  @route      GET  /api/student
//  @access     Private
const students = asyncHandler(async (req, res) => {
  try {
    const items = await User.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occureed while retrieving the students." });
  }
});

// @desc    Update student
// @route   Put   /api/student
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        name: req.body.name,
        roll: req.body.roll,
        email: req.body.email,
        guardianName: req.body.guardianName,
        contact: req.body.contact,
      },
    );
    console.log(update);
    return res.status(200).json({ message: "Student updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while updating the post" });
  }
});

// @desc    Delete student
// @route   Delete  /api/deleteStudent
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Student not deleted" });
    }
    console.log(deleted);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured while deleting the post" });
  }
});

// @desc    Register Accountant
// @route   POST  /api/accountant/create
// @access  Private
const registerAccountant = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // Check either student exists or not
    const existingAccountant = await Accountant.findOne({ email });
    if (existingAccountant) {
      return res.json({ error: "Accountant already exists" });
    }

    // if not create Accountant
    const createAccountant = await Accountant.create({
      name,
      email,
      contact,
      password,
    });

    if (createAccountant) {
      // assign token with the id from mongoose
      generateToken(res, createAccountant._id);

      console.log(createAccountant); // check whether the token and accountant is created
      res.status(201).json({
        mesage: "Accountant created successfully",
        success: true,
        createAccountant,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while creating accountant" });
  }
});

// @desc    Get accountant
// @route   GET   /api/accountant
// @access  Private
const getAccountant = asyncHandler(async (req, res) => {
  try {
    const items = await Accountant.find();
    res.json(items);
  } catch (error) {
    throw new Error("Error while retrieving accountant");
  }
});

// @desc    Update Accountant
// @route   PUT   /api/accountant
// @access  Private
const updateAccountant = asyncHandler(async (req, res) => {
  try {
    const update = await Accountant.findByIdAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      },
    );
    console.log(update);
    return res.status(200).json({ message: "Accountant updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while updating the Accountant" });
  }
});

//  @desc       Delete accountant
//  @route      Delete  /api/deleteAccountant
//  @access     Public
const deleteAccountant = async (req, res) => {
  try {
    const deleted = await Accountant.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Accountant not deleted" });
    }
    console.log(deleted);
    res.status(200).json({ message: "Accountant deleted successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the accountant" });
  }
};

// @desc    Payment
// @route   Post  api/processPayment
// @access  Private
const processPayments = asyncHandler(async (req, res) => {
  const {
    name,
    semester,
    address,
    parentsName,
    amount,
    paymentDate,
    email,
    guardianContact,
  } = req.body;
  const photo = req.file.filename;

  try {
    // creating new instance of payment model
    const newPayment = new payment({
      name,
      address,
      semester,
      parentsName,
      amount,
      paymentDate,
      email,
      photo,
      guardianContact,
    });

    // saving the payment instance
    const payment = await newPayment.save();

    const notificationMessage = `The payment of ${payment.amount} for the ${payment.semester} semester has been successfully processed by ${payment.name} `;
    const notification = await Notification.create({
      userId: payment.userId,
      accountantId: req.body.accountantId,
      paymentId: payment._id,
      message: notificationMessage,
    });
    return res.status(201).json({
      message: "Payment processed successfully",
      success: true,
      payment,
      notification,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Payment unsuccessful", details: error.message });
  }
});

// @desc    Get payments
// @route   GET /statements
// @access  Private
const getPayment = asyncHandler(async (req, res) => {
  try {
    const paid = await payment.find();
    res.json(paid);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occured while retrieving payments " });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProile = asyncHandler(async (req, res) => {
  res.json({ mesage: "update profile" });
});

// @desc    Get notification
// @route   GET /users/Notification
// @access  Private
const getNotification = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.findById({ _id: req.params._id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Mark notification as read
// @route   PUT /users/notifications/:id/mark-as-read
// @access  Private
const readNotification = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params._id,
      { read: true },
      { new: true },
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error " });
  }
});

// @desc    create a new semester fee
// @route   POST /createSemesterFee
// @access  Private
const createSemesterFee = asyncHandler(async (req, res) => {
  try {
    const {
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
    } = req.body;

    // Check either semester exists or not
    const existingSemester = await SemesterFee.findOne({ semester });
    if (existingSemester) {
      return res.json({ error: "Semester already exist" });
    }

    // if not create Semester Fee
    const newSemesterFee = await SemesterFee.create({
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
    });
    console.log(newSemesterFee); //! check whether smessterFee is created or not
    res.status(201).json({
      message: `${semester} fee created successfully`,
      success: true,
      newSemesterFee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: " An error occured while creating new sememster fee ",
    });
  }
});

// @desc    Get fees
// @route   Get /api/fees
// @access  Private
const feeStructure = asyncHandler(async (req, res) => {
  try {
    const { semester } = req.body;
    console.log(req.body);
    const fee = await SemesterFee.find({ semester });
    console.log(fee);
    return res.status(200).json({ fee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occured while retrieving fee",
    });
  }
});

// @desc    Update Fee
// @route   Put   /api/updateFeeStructure
// @access  Private
const updateFeeStructure = asyncHandler(async (req, res) => {
  try {
    const {
      _id,
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
    } = req.body;
    console.log(req.body);
    const update = await SemesterFee.findByIdAndUpdate(
      { _id },
      {
        semester,
        admissionFee,
        tutionFee,
        libraryFee,
        internalExamFee,
        boardExamFee,
        infrastructureDevelopmentFee,
        labFee,
        identityCardFee,
      },
    );
    console.log(update);
    return res
      .status(200)
      .json({ message: "fee structured updated successfully", update });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occured while updating fee structure" });
  }
});

// @desc    Delete feeStructure
// @route   Delete /api/deleteFeeStructure
// @access  Private
const deleteFeeStructure = asyncHandler(async (req, res) => {
  try {
    const deleted = await SemesterFee.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Fee structure not deleted" });
    }
    console.log(deleted, "fee structure deleted");
    return res
      .status(200)
      .json({ message: "Fee structure Deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the fee Structure" });
  }
});

module.exports = {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProile,
  registerStudent,
  students,
  updateStudent,
  deleteStudent,
  registerAccountant,
  getAccountant,
  updateAccountant,
  deleteAccountant,
  processPayments,
  getPayment,
  getNotification,
  readNotification,
  createSemesterFee,
  feeStructure,
  updateFeeStructure,
  deleteFeeStructure,
};
