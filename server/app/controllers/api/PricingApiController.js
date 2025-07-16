const ErrorCode = require("../../helper/httpStatusCode");
const PricingModel = require("../../model/admin/Pricing");
class PricingApiController {

  //get all student
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
}

module.exports = new PricingApiController();
