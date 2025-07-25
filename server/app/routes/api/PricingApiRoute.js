const express = require("express");
const PricingApiController = require("../../controllers/api/PricingApiController");
const router = express.Router();


router.get("/pricing/list", PricingApiController.pricinglist);
router.get("/pricing/:id", PricingApiController.pricingId);

module.exports = router;
