const jwt = require("jsonwebtoken");
const verifyOtp = async (req, res, next) => {
  try {
    const token = req.cookies.otp;
    const decode = jwt.verify(token, process.env.SEND_OTP);
    req.token = token;
    req.otp = decode;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = verifyOtp;
