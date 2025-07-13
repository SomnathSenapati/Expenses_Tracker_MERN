const express = require("express");
const HomeController = require("../../controllers/admin/HomeController");
const router = express.Router();

router.get("/list", HomeController.List);
router.get("/add", (req, res) => {
  try {
    res.render("home/add", {
      title: "home Add",
    });
  } catch (error) {
    res.redirect("/home/add");
  }
});
router.post('/add',HomeController.add)
router.get('/edit/:id',HomeController.edit)
router.post('/update/:id',HomeController.update)
router.get('/delete/:id',HomeController.delete)

module.exports = router;
