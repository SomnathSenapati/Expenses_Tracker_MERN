const ErrorCode = require("../../helper/httpStatusCode");
const HomeModel = require("../../model/admin/Home");
class HomeApiController {

  //get home content
  async homelist(req, res) {
    try {
      //console.log(req.body);
      const home = await HomeModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get home successfully",
        total: home.length,
        data: home,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new HomeApiController();
