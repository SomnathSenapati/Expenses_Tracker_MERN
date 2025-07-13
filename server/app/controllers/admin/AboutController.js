// const ErrorCode = require("../../helper/httpsServerCode");
const AboutModel = require("../../model/admin/AboutUs");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class AboutController {
  async createabout(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { title, content } = req.body;

      const sdata = new AboutModel({
        title,
        content,
      });
      const data = await sdata.save();
      if (data) {
        res.redirect("/about/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async aboutList(req, res) {
    try {
      const data = await AboutModel.find();

      res.render("about/list", {
        title: "about List",
        data: data,
      });
    } catch (error) {
      res.redirect("/about/list", { message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await AboutModel.findById(id);
      res.render("about/edit", {
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

      // Fetch the existing about document
      const existingabout = await AboutModel.findById(id);
      if (!existingabout) {
        return res.status(404).json({
          status: false,
          message: "about not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingabout.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingabout.image
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

      // Update the about document
      const updatedabout = await AboutModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedabout) {
        return res.status(404).json({
          status: false,
          message: "about not found",
        });
      }

      res.redirect("/about/list");
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

      const deletedData = await AboutModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          status: false,
          message: "About not found",
        });
      }

      res.redirect("/about/list");
    } catch (error) {
      console.error("Error deleting about:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
}
module.exports = new AboutController();
