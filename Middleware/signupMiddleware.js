const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  try {
    const token = req.cookies.pass;
    const decode = jwt.verify(token, process.env.PASSWORD);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = signup;
