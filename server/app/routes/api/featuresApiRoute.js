const express = require("express");
const featuresApiController = require("../../controllers/api/FeaturesApiController");
const router = express.Router();

router.get("/features/list", featuresApiController.featureslist);

module.exports = router;
