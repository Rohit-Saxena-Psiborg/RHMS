const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const validate = require("../Middleware/validationMiddleware");
const {
  sendOtpSchema,
  OTPSchema,
  signupSchema,
  loginSchema,
  userData
} = require("../Validation/validationSchema");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${req.user._id}${file.originalname}`);
  },
});
const upload = multer({ storage });
const authVerify = require("../Middleware/authValidation");
const otpToken = require("../Middleware/otpMiddleware");
const signupMid = require("../Middleware/signupMiddleware");
router.route("/sendotp").post(validate(sendOtpSchema), authController.sendOtp);
router
  .route("/verifyotp")
  .post(validate(OTPSchema), otpToken, authController.verifyotpMatch);
router
  .route("/signup")
  .post(validate(signupSchema), signupMid, authController.signup);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/verify").get(authVerify, authController.verifyUser);
router
  .route("/info")
  .patch(
    authVerify,
    upload.single("imageUrl"),
    validate(userData),
    authController.personalInfoUpdate
  );
module.exports = router;
