const express = require("express");
const ServiceApiController = require("../../controllers/api/ServicesApiController");
const router = express.Router();

router.get("/service/list", ServiceApiController.servicelist);

module.exports = router;
