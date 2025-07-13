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
        features: features.split(",").map(f=> f.trim()),
        button,
        popular:req.body.popular === "on",
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
      const existingabout = await PricingModel.findById(id);
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
      const updatedabout = await PricingModel.findByIdAndUpdate(id, updateData, {
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
    console.log(req.body);

    try {
      const id = req.params.id;

      const updatedata = await PricingModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!updatedata) {
        return res.status(404).json({
          status: false,
          message: "about not found",
        });
      }

      if (updatedata.image) {
        const absolutePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          updatedata.image
        );
        console.log("__dirname to delete:", __dirname);
        console.log("Attempting to delete:", absolutePath);

        if (fsSync.existsSync(absolutePath)) {
          await fs.unlink(absolutePath);
          console.log(absolutePath);

          console.log("File deleted:", absolutePath);
        } else {
          console.log("File not found:", absolutePath);
        }
      }

      res.redirect("/about/list");
    } catch (error) {
      console.log(error);
      console.error("Error deleting file:", err);
    }
  }
}
module.exports = new PricingController();
