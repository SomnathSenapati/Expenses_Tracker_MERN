const express = require("express");
require("dotenv").config();
const dbConfig = require("./app/config/dbConfig");
const cors = require("cors")
const path = require("path");

const app = express();
dbConfig();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//statice folder setup
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("This is MY backend");
});
app.get("/dashboard", (req,res)=>{
  res.render("dashboard");
})

//routes
const userRouter = require("./app/routes/users/userRouter");
app.use("/api/user", userRouter);

const IncomeRouter = require("./app/routes/income/incomeRoute");
app.use("/api/income", IncomeRouter);

module.exports = app;
