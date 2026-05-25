import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    console.log(req.body); 

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      username: username,
      password_hash: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};