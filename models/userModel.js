const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  passwordChangedAt: Date,
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


// Document Middleware runs on .create or .save

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // for not encrypt again when update detail

  this.password = await bcrypt.hash(this.password, 12);

  next();
});


userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// for getting active user
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("User", userSchema);
