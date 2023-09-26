const mongoose = require("mongoose");

const userRoleEnum = ["customer", "vendor", "admin", "editor"];
const userGenderEnum = ["male", "female", "other"];
const registrationTypeEnum = ["phone", "google", "facebook"];

const userSchema = new mongoose.Schema({
  // Basic user information
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unqiue: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'A minimum length of password is 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: {
      values: userRoleEnum,
      message: "Role is either: customer or vendor."
    },
    default: "customer", // Set a default role
  },

  // Personal information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: userGenderEnum,
      message: "Gender is either: male, female or other"
    },
    required: true,
  },

  profilePicture: {
    type: mongoose.Schema.ObjectId,
    ref: "Media",
  },

  // Address information
  address: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
  },

  registrationType: {
    type: String,
    enum: {
      values: registrationTypeEnum,
      message: "Type is either: phone, google or facebook"
    },
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  //User preferences
  //   preferences: {
  //     emailNotifications: {
  //       type: Boolean,
  //       default: true,
  //     },
  //     //Add other preferences as needed
  //   },
}, {
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

module.exports = mongoose.model("User", userSchema);
