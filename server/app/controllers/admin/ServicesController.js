// const ErrorCode = require("../../helper/httpsServerCode");
const ServicesModel = require("../../model/admin/Services");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class ServicesController {
  async add(req, res) {
    console.log(req.body);
    console.log(req.file);

    try {
      //console.log(req.body);
      const { title, subtitle, description } = req.body;

      const sdata = new ServicesModel({
        title,
        subtitle,
        description,
      });
      if (req.file) {
        sdata.image = req.file.path;
      }
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

  //about
  async List(req, res) {
    try {
      const data = await ServicesModel.find({ isDeleted: false });

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
      const existingabout = await ServicesModel.findById(id);
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
      const updatedabout = await ServicesModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

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

      const updatedata = await ServicesModel.findByIdAndUpdate(id, {
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
module.exports = new ServicesController();
