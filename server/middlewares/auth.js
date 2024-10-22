const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invaild",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating Token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const accountType = req.user.role;
    if (accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User role can't be varified , please try again",
    });
  }
};
