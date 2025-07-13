const express = require("express");
const FeaturesController = require("../../controllers/admin/FeaturesController");
const router = express.Router();

router.get("/list", FeaturesController.List);
router.get("/add", (req, res) => {
  try {
    res.render("features/add", {
      title: "features Add",
    });
  } catch (error) {
    res.redirect("/features/add");
  }
});
router.post('/add',FeaturesController.add)
router.get('/edit/:id',FeaturesController.edit)
router.post('/update/:id',FeaturesController.update)
router.get('/delete/:id',FeaturesController.delete)

module.exports = router;
