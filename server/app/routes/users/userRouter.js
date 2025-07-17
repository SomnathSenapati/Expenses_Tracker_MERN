const express = require("express");
const UserAuthController = require("../../controllers/users/UserAuthController");
const router = express.Router();

// Public Routes
router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);
router.get("/all-user",UserAuthController.AllUsers)
router.get("/profile/:id", UserAuthController.profile);
router.get("/dashboard/:id", UserAuthController.dashboard);

module.exports = router;
