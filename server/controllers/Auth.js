const prisma = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, collegeEnrollNo, email, password } = req.body;

    console.log({ name, collegeEnrollNo, email, password });

    if (!name || !email || !password || !collegeEnrollNo) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { collegeEnrollNo: collegeEnrollNo }, // Check for collegeEnrollNo as well
        ],
      },
    });

    console.log(userExist);

    if (userExist) {
      if (userExist.email === email) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email.",
        });
      }
      if (userExist.collegeEnrollNo === collegeEnrollNo) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this college enrollment number.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = `https://robohash.org/${name}`;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        collegeEnrollNo,
        role: "User",
        profileImage: avatarUrl,
      },
    });

    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    console.log(token);

    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "None",
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User registered successfully",
        token,
        user: { ...user, token },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User can't registred, please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    console.log(token);

    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        user: { ...user, token },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};
