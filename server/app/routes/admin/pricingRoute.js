const express = require("express");
const PricingController = require("../../controllers/admin/PricingController");
const router = express.Router();

router.post('/add',PricingController.add)
router.get("/list", PricingController.List);
router.get("/add", (req, res) => {
  try {
    res.render("pricing/add", {
      title: "pricing Add",
    });
  } catch (error) {
    res.redirect("/pricing/add");
  }
});
// router.get('/edit/:id',PricingController.edit)
// router.post('/update/:id',StudentImageupload.single('image'),PricingController.update)
// router.get('/delete/:id',PricingController.delete)

module.exports = router;
