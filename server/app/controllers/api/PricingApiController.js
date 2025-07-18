const ErrorCode = require("../../helper/httpStatusCode");
const pricingModel = require("../../model/admin/Pricing");
const PricingModel = require("../../model/admin/Pricing");
class PricingApiController {
  //get all plans
  async pricinglist(req, res) {
    try {
      //console.log(req.body);
      const pricing = await PricingModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get all pricing successfully",
        total: pricing.length,
        data: pricing,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }

  async pricingId(req, res) {
    try {
      const plan = await pricingModel.findById(req.params.id);
      if (!plan) return res.json({ status: false, message: "Plan not found" });

      res.json({ status: true, data: plan });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }
}

module.exports = new PricingApiController();
