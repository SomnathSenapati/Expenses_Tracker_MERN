const { mongoose } = require("mongoose");
const httpStatusCode = require("../../helper/httpStatusCode");
const { hashedPassword, comparePassword } = require("../../middleware/auth");
const expenseModel = require("../../model/expense");
const incomeModel = require("../../model/income");
const userModel = require("../../model/user");
const jwt = require("jsonwebtoken");
const {Validator} = require("node-input-validator");
const sendEmailVerificationOTP = require("../../helper/sendOtpVerify");
const otpModel = require("../../model/otpModel");

class UserAuthController {
  async register(req, res) {
    try {
      const rules = {
        name: "required|string|minLength:3",
      };

      //console.log(req.body);
      const { name, email, password, phone } = req.body;
      const v = new Validator(req.body, rules);
      const matched = await v.check();
      // validate the request payload
      if (!matched) {
        return res.status(400).json({
          status: 400,
          error: v.errors,
        });
      }

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

      const hashed = hashedPassword(password);

      const user = new userModel({
        name,
        email,
        password: hashed,
        phone,
      });
      const data = await user.save();
      sendEmailVerificationOTP(req, user);

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "user created successfully and otp send your mail id",
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

  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;
      // Check if all required fields are provided
      if (!email || !otp) {
        return res
          .status(400)
          .json({ status: false, message: "All fields are required" });
      }
      const Userexisting = await userModel.findOne({ email });

      // Check if email doesn't exists
      if (!Userexisting) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email doesn't exists" });
      }

      // Check if email is already verified
      if (Userexisting.is_verify) {
        return res
          .status(400)
          .json({ status: false, message: "Email is already verified" });
      }
      // Check if there is a matching email verification OTP
      const emailVerification = await otpModel.findOne({
        userId: Userexisting._id,
        otp,
      });
      if (!emailVerification) {
        if (!Userexisting.is_verify) {
          // console.log(existingUser);
          await sendEmailVerificationOTP(req, Userexisting);
          return res.status(400).json({
            status: false,
            message: "Invalid OTP, new OTP sent to your email",
          });
        }
        return res.status(400).json({ status: false, message: "Invalid OTP" });
      }
      // Check if OTP is expired
      const currentTime = new Date();
      // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000
      );
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({
          status: "failed",
          message: "OTP expired, new OTP sent to your email",
        });
      }
      // OTP is valid and not expired, mark email as verified
      Userexisting.is_verify = true;
      await Userexisting.save();

      // Delete email verification document
      await otpModel.deleteMany({ userId: Userexisting._id });
      return res
        .status(200)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Unable to verify email, please try again later",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "All filed is required",
        });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "user not found",
        });
      }
      // Check if user verified
      if (!user.is_verify) {
        return res
          .status(401)
          .json({ status: false, message: "Your account is not verified" });
      }
      const ismatch = comparePassword(password, user.password);
      if (!ismatch) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "invalid password",
        });
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
    }
  }

  async resendOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          status: false,
          message: "Email is required",
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "Email does not exist",
        });
      }

      if (user.is_verify) {
        return res.status(400).json({
          status: false,
          message: "Email is already verified",
        });
      }

      // Generate and send new OTP
      await sendEmailVerificationOTP(req, user);

      return res.status(200).json({
        status: true,
        message: "New OTP sent to your email",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Unable to send OTP, please try again later",
      });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          status: false,
          message: "Email is required",
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Generate and send reset OTP
      await sendEmailVerificationOTP(req, user); // Reuse same send OTP helper

      return res.status(200).json({
        status: true,
        message: "Reset OTP has been sent to your email",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Failed to send reset OTP. Please try again later.",
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      const otpEntry = await otpModel.findOne({ userId: user._id, otp });

      if (!otpEntry) {
        return res.status(400).json({
          status: false,
          message: "Invalid or expired OTP",
        });
      }

      // Check if OTP expired
      const currentTime = new Date();
      const expirationTime = new Date(
        otpEntry.createdAt.getTime() + 15 * 60 * 1000
      );
      if (currentTime > expirationTime) {
        await sendEmailVerificationOTP(req, user); // Send new OTP
        return res.status(400).json({
          status: false,
          message: "OTP expired. A new OTP has been sent.",
        });
      }

      // Update the password
      user.password = hashedPassword(newPassword);
      await user.save();

      // Remove used OTP
      await otpModel.deleteMany({ userId: user._id });

      return res.status(200).json({
        status: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Unable to reset password. Please try again later.",
      });
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
      const objectUserId = new mongoose.Types.ObjectId(userId);
      // console.log(objectUserId)

      const income = await incomeModel.aggregate([
        { $match: { user: objectUserId } },
      ]);

      const expense = await expenseModel.aggregate([
        { $match: { user: objectUserId } },
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
