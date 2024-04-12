const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Userd = require("../Models/userModel");
function generateOtp(length) {
  const character = "0123456789";
  var otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 10);
    otp += character[randomIndex];
  }
  return parseInt(otp, 10);
}
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rohit.saxena@psiborg.in",
    pass: "iaks igct qnwp olyb",
  },
});
const sendOtp = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (await Userd.findOne({ email })) {
      return res.status(409).json({ message: "Email already exist" });
    }
    const verifyOtp = generateOtp(6);
    transporter.sendMail(
      {
        from: "rohit.saxena@psiborg.in",
        to: email,
        subject: "Otp",
        text: `Hello ${name} is Your Otp ${verifyOtp}`,
      },
      (error, info) => {
        if (error) {
          return res.status(404).json({ error: "Failed To Send Otp" });
        }
        const otpToken = jwt.sign(
          { email, name, verifyOtp },
          process.env.SEND_OTP,
          {
            expiresIn: "2m",
          }
        );
        res
          .cookie("otp", otpToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 1000 * 2,
            sameSite: "strict",
          })
          .status(201)
          .json({ message: "Verfication send" });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const verifyotpMatch = async (req, res) => {
  try {
    const { email, name, verifyOtp } = req.otp;
    const { otp } = req.body;
    if (otp !== verifyOtp) {
      return res.status(401).json({ message: "Otp is not match" });
    }
    const passToken = jwt.sign({ email, name }, process.env.PASSWORD, {
      expiresIn: "3m",
    });
    res
      .cookie("pass", passToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 1000 * 2,
        sameSite: "strict",
      })
      .status(202)
      .json({ message: "otp verify sucessfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const signup = async (req, res) => {
  try {
    const { email, name } = req.user;
    const { password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password Not Match" });
    } else if (await Userd.findOne({ email })) {
      console.log();
      return res.status(409).json({ message: "User already exist" });
    }
    const newUser = new Userd({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User Created Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Userd.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(401).json({ message: "Password not match" });
    }
    res
      .cookie("token", await user.generateToken(), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 1000 * 10,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Login Sucess" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const verifyUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const personalInfoUpdate = async (req, res) => {
  try {
    const {
      phone,
      dateOfBirth,
      fullAddress,
      pinCode,
      city,
      state,
      country,
      doctorType,
      speciality,
      yearOfexp,
      consultancyFee,
      nofDevice,
      nofAssignPatient,
    } = req.body;
    const image = req.file.path;
    const { _id } = req.user;
    const updateUser = {
      phone: phone,
      dateOfBirth: dateOfBirth,
      imageUrl: image,
      address: {
        fullAddress: fullAddress,
        pinCode: pinCode,
        city: city,
        state: state,
        country: country,
      },
      professional: {
        doctorType: doctorType,
        speciality: speciality,
        yearOfexp: yearOfexp,
        consultancyFee: consultancyFee,
      },
      nofDevice: nofDevice,
      nofAssignPatient: nofAssignPatient,
    };
    const userUpdate = await Userd.findByIdAndUpdate(_id, updateUser, {
      new: true,
    }).select({ password: 0 });
    if (!userUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: userUpdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  sendOtp,
  verifyotpMatch,
  signup,
  login,
  verifyUser,
  personalInfoUpdate,
};
