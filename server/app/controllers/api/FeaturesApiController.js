const ErrorCode = require("../../helper/httpStatusCode");
const FeaturesModel = require("../../model/admin/Features");
class FeaturesApiController {
 
  //get all features
  async featureslist(req, res) {
    try {
      //console.log(req.body);
      const features = await FeaturesModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get all features successfully",
        total: features.length,
        data: features,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new FeaturesApiController();
