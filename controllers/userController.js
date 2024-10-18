const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({
      message: "User registered successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({
      userCount: users.length,
      message: "All users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in get all users callback",
      success: false,
      error,
    });
  }
};

// login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    // find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    // if password not match
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid credentials",
        success: false,
      });
    }

    // create and send jwt token
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    return res.status(200).send({
      message: "User logged in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in login callback",
      success: false,
      error,
    });
  }
};
