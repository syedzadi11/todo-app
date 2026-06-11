import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register — create a new user
export const registerUser = async (username, password) => {
  // Check if the user already exists
  const existingUser = await db.User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  //  hash the Password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create the User 
  const user = await db.User.create({
    username,
    password_hash: passwordHash,
  });

  return user;
};

// Login — find user and verify them
export const loginUser = async (username, password) => {
  // find the User 
  const user = await db.User.findOne({ where: { username } });
  if (!user) {
    throw new Error("User not found");
  }

  //  verify the password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // Generate Token 
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};

// Find User by ID 
export const getUserById = async (id) => {
  return await db.User.findByPk(id);
};

// Update user —  change username or password
export const updateUser = async (id, { username, password }) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error("User not found");

  // Username update 
  if (username) {
    const existing = await db.User.findOne({ where: { username } });
    if (existing && existing.id !== id) {
      throw new Error("Username already taken");
    }
    user.username = username;
  }

  // Password update 
  if (password) {
    user.password_hash = await bcrypt.hash(password, 10);
  }

  await user.save();
  return user;
};
