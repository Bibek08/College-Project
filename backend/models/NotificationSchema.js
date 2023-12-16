const mongoose = require("mongoose");
const Accountant = require("../models/accountantSchema");
const User = require("../models/userSchema");
const payment = require("../models/payment");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, //? Reference to the user model for the user making the payment
      required: true,
    },
    accountantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Accountant, //? Reference to the User model for the accountant
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: payment, //? Refernce to the Payment model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // userType: {
    //   type: String,
    //   enum: ["user", "accountant"],
    //   required: true,
    // },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
