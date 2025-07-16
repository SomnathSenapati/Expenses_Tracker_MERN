const ErrorCode = require("../../helper/httpStatusCode");
const ContactModel = require("../../model/admin/Contact");
class ContactApiController {

  //get all contact
  async contactlist(req, res) {
    try {
      //console.log(req.body);
      const contact = await ContactModel.find();

      return res.status(ErrorCode.Ok).json({
        status: true,
        message: "get all contact successfully",
        total: contact.length,
        data: contact,
      });
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ContactApiController();
