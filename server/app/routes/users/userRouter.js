const express = require("express");
const UserAuthController = require("../../controllers/users/UserAuthController");
// const { AuthCheck } = require("../../middleware/auth");
const router = express.Router();

// Public Routes
router.post("/register", UserAuthController.register);
router.post("/verify/email", UserAuthController.verifyEmail);
router.post("/login", UserAuthController.login);
router.post("/resend-otp", UserAuthController.resendOtp);
router.get("/all-user", UserAuthController.AllUsers);
router.post("/forgot-password", UserAuthController.forgotPassword);
router.post("/reset-password", UserAuthController.resetPassword);


router.get("/profile/:id", UserAuthController.profile);
router.get("/dashboard/:id", UserAuthController.dashboard);

module.exports = router;