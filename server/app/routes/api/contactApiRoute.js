const express = require("express");
const contactApiController = require("../../controllers/api/ContactApiController");
const router = express.Router();

router.get("/contact/list", contactApiController.contactlist);

module.exports = router;
