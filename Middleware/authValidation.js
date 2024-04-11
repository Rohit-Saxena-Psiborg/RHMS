const jwt = require("jsonwebtoken");
const userData = require("../Models/userModel");
const verifyUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Please Authenticate" });
    }
    const decode = jwt.verify(token, process.env.SECERETKEY);
    const user = await userData
      .findOne({ email: decode.email })
      .select({ password: 0 });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = verifyUserMiddleware;
