const express = require("express");
const ServicesController = require("../../controllers/admin/ServicesController");
const router = express.Router();

router.get("/list", ServicesController.List);
router.get("/add", (req, res) => {
  try {
    res.render("services/add", {
      title: "services Add",
    });
  } catch (error) {
    res.redirect("/services/add");
  }
});

router.post("/add", ServicesController.add);
// router.get("/edit/:id", ServicesController.edit);
// router.post("/update/:id", ServicesController.update);
// router.get("/delete/:id", ServicesController.delete);

module.exports = router;