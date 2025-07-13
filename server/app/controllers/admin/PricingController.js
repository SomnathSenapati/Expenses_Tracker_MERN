// const ErrorCode = require("../../helper/httpsServerCode");
const PricingModel = require("../../model/admin/Pricing");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class PricingController {
  async add(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { name, price, features, button, popular } = req.body;

      const sdata = new PricingModel({
        name,
        price,
        features: features.split(",").map((f) => f.trim()),
        button,
        popular: req.body.popular === "on",
      });

      const data = await sdata.save();
      if (data) {
        res.redirect("/pricing/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async List(req, res) {
    try {
      const data = await PricingModel.find();

      res.render("pricing/list", {
        title: "pricing List",
        data: data,
      });
    } catch (error) {
      res.redirect("/pricing/list", { message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await PricingModel.findById(id);
      res.render("pricing/edit", {
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

      // Fetch the existing pricing document
      const existingpricing = await PricingModel.findById(id);
      if (!existingpricing) {
        return res.status(404).json({
          status: false,
          message: "pricing not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingpricing.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingpricing.image
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

      // Update the pricing document
      const updatedpricing = await PricingModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedpricing) {
        return res.status(404).json({
          status: false,
          message: "pricing not found",
        });
      }

      res.redirect("/pricing/list");
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

      const deletedData = await PricingModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          status: false,
          message: "Pricing not found",
        });
      }

      res.redirect("/pricing/list");
    } catch (error) {
      console.error("Error deleting pricing:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
}
module.exports = new PricingController();
