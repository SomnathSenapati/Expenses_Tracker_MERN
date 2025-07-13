// const ErrorCode = require("../../helper/httpStatusCode");
const ContactModel = require("../../model/admin/Contact");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class ContactController {
  async add(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { email, phone, address } = req.body;

      const sdata = new ContactModel({
        email,
        phone,
        address,
      });
      const data = await sdata.save();
      if (data) {
        res.redirect("/contact/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async List(req, res) {
    try {
      const data = await ContactModel.find();

      res.render("contact/list", {
        title: "contact List",
        data: data,
      });
    } catch (error) {
      res.redirect("/contact/list");
    }
  }
  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await ContactModel.findById(id);
      res.render("contact/edit", {
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

      // Fetch the existing contact document
      const existingcontact = await ContactModel.findById(id);
      if (!existingcontact) {
        return res.status(404).json({
          status: false,
          message: "contact not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingcontact.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingcontact.image
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

      // Update the contact document
      const updatedcontact = await ContactModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedcontact) {
        return res.status(404).json({
          status: false,
          message: "contact not found",
        });
      }

      res.redirect("/contact/list");
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

      const updatedata = await ContactModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!updatedata) {
        return res.status(404).json({
          status: false,
          message: "contact not found",
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

      res.redirect("/contact/list");
    } catch (error) {
      console.log(error);
      console.error("Error deleting file:", err);
    }
  }
}
module.exports = new ContactController();
