const ErrorCode = require("../../helper/httpStatusCode");
const serviceModel = require("../../model/admin/Services");
class ServicesApiController {
 
  //get all services
  async servicelist(req, res) {
    try {
      //console.log(req.body);
      const service = await serviceModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get all service successfully",
        total: service.length,
        data: service,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ServicesApiController();
