const express = require("express");
const homeApiController = require("../../controllers/api/HomeApiController");
const router = express.Router();

router.get("/home/list", homeApiController.homelist);

module.exports = router;
