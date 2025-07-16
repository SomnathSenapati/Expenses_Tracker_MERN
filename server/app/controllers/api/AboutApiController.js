const ErrorCode = require("../../helper/httpStatusCode");
const AboutModel = require("../../model/admin/AboutUs");
class AboutApiController {
  //get about
  async aboutlist(req, res) {
    try {
      //console.log(req.body);
      const about = await AboutModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get about successfully",
        total: about.length,
        data: about,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AboutApiController();
