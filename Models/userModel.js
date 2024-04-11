const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullAddress: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});
const professionalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  doctorType: {
    type: String,
  },
  speciality: {
    type: String,
  },
  yearOfexp: {
    type: Number,
  },
  consultancyFee: {
    type: Number,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  phone: {
    type: Number,
    min: 10,
    max: 13,
  },
  dateOfBirth: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: addressSchema,
  },
  professional: {
    type: professionalSchema,
  },
  nofDevice: {
    type: Number,
  },
  nofAssignPatient: {
    type: String,
  },
});
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    console.log(err.message);
  }
});
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { _id: this._id, email: this.email },
      process.env.SECERETKEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};
const User = new mongoose.model("User", userSchema);
module.exports = User;
