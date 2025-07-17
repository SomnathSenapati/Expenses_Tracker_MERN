const httpStatusCode = require("../../helper/httpStatusCode");
const { hashedPassword, comparePassword } = require("../../middleware/auth");
const expenseModel = require("../../model/expense");
const incomeModel = require("../../model/income");
const userModel = require("../../model/user");
const jwt = require("jsonwebtoken");

class UserAuthController {
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "All fields are required",
        });
      }
      //check for dublicate email
      const isExistingUser = await userModel.findOne({ email });
      if (isExistingUser) {
        return res.status(httpStatusCode.Conflict).json({
          status: false,
          message: "email already exist",
        });
      }

      if (name.length < 3 || name.length > 30) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "Name must be within 3 to 30  characters",
        });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "Phone must be of 10 digits",
        });
      }

      const hashed = await hashedPassword(password);

      const user = new userModel({
        name,
        email,
        password: hashed,
        phone,
      });
      const data = await user.save();

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "Registration Successfull",
        data: data,
      });
    } catch (error) {
      console.log("err", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(httpStatusCode.BadRequest)
          .json({ message: "All fields are required" });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(httpStatusCode.NotFound)
          .json({ message: "Email does not exist" });
      }

      const ismatch = comparePassword(password, user.password);
      if (!ismatch) {
        return res
          .status(httpStatusCode.Unauthorized)
          .json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );

      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "user login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async AllUsers(req, res) {
    try {
      const user = await userModel.find();
      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "All User Fetch Successfully",
        total: user.length,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatusCode.InternalServerError)
        .json({ message: "Server error" });
    }
  }

  async profile(req, res) {
    try {
      const id = req.params.id;

      const edit = await userModel.findById(id);

      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "get single user",
        data: edit,
      });
    } catch (error) {
      return res.status(ErrorCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async dashboard(req, res) {
    try {
      const userId = req.params.id;
      // console.log(userId)

      const income = await incomeModel.aggregate([
        { $match: { user: userId } },
      ]);

      const expense = await expenseModel.aggregate([
        { $match: { user: userId } },
      ]);

      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "User dashboard data retrieved successfully.",
        totalIncome: income.length,
        income: income,
        totalExpense: expense.length,
        expense: expense,
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserAuthController();
