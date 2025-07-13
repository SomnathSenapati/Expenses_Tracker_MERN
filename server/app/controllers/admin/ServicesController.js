// const ErrorCode = require("../../helper/httpsServerCode");
const ServicesModel = require("../../model/admin/Services");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class ServicesController {
  async add(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { title, description, icon } = req.body;

      const sdata = new ServicesModel({
        title,
        description,
        icon,
      });
      const data = await sdata.save();
      if (data) {
        res.redirect("/services/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async List(req, res) {
    try {
      const data = await ServicesModel.find();
      res.render("services/list", {
        title: "services List",
        data: data,
      });
    } catch (error) {
      res.redirect("/services/list", { message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await ServicesModel.findById(id);
      res.render("services/edit", {
        title: "edit page",
        data: editdata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      // Fetch the existing services document
      const existingservices = await ServicesModel.findById(id);
      if (!existingservices) {
        return res.status(404).json({
          status: false,
          message: "services not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingservices.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingservices.image
          );
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            } else {
              console.log("Old image deleted successfully.");
            }
          });
        }

        // Update the image path in the update data
        updateData.image = req.file.path;
        console.log("New image uploaded and path added:", req.file.path);
      }

      // Update the services document
      const updatedservices = await ServicesModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedservices) {
        return res.status(404).json({
          status: false,
          message: "services not found",
        });
      }

      res.redirect("/services/list");
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedData = await ServicesModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          status: false,
          message: "Services not found",
        });
      }

      res.redirect("/services/list");
    } catch (error) {
      console.error("Error deleting services:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
}
module.exports = new ServicesController();
