const express = require("express");
const AboutApiController = require("../../controllers/api/AboutApiController");
const router = express.Router();


router.get("/about/list", AboutApiController.aboutlist);

module.exports = router;
