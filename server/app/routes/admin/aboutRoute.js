const express = require("express");
const AboutController = require("../../controllers/admin/AboutController");
const router = express.Router();

router.get("/list", AboutController.aboutList);
router.get("/add", (req, res) => {
  try {
    res.render("about/add", {
      title: "about Add",
    });
  } catch (error) {
    res.redirect("/about/add");
  }
});
// router.post('/add',AboutController.createabout)
// router.get('/edit/:id',AboutController.edit)
// router.post('/update/:id',AboutController.update)
// router.get('/delete/:id',AboutController.delete)

module.exports = router;
