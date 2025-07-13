// const ErrorCode = require("../../helper/httpsServerCode");
const FeaturesModel = require("../../model/admin/Features");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class FeaturesController {
  async add(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { title, description, icon } = req.body;

      const sdata = new FeaturesModel({
        title,
        description,
        icon,
      });
      const data = await sdata.save();
      if (data) {
        res.redirect("/features/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async List(req, res) {
    try {
      const data = await FeaturesModel.find();

      res.render("features/list", {
        title: "features List",
        data: data,
      });
    } catch (error) {
      res.redirect("/features/list", { message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await FeaturesModel.findById(id);
      res.render("features/edit", {
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

      // Fetch the existing features document
      const existingfeatures = await FeaturesModel.findById(id);
      if (!existingfeatures) {
        return res.status(404).json({
          status: false,
          message: "features not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingfeatures.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingfeatures.image
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

      // Update the features document
      const updatedfeatures = await FeaturesModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedfeatures) {
        return res.status(404).json({
          status: false,
          message: "features not found",
        });
      }

      res.redirect("/features/list");
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

      const deletedData = await FeaturesModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          status: false,
          message: "Features not found",
        });
      }

      res.redirect("/features/list");
    } catch (error) {
      console.error("Error deleting features:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
}
module.exports = new FeaturesController();
