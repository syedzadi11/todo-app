
import { asyncHandler } from "../middlewares/async.middleware.js";
import { registerUser, loginUser, updateUser } from "../services/user.service.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";

// REGISTER USER
export const registerUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Username and password required",
    });
  }

  const user = await registerUser(username, password);

  res.status(HTTP_STATUS.CREATED).json({
    message: "User registered successfully",
    user,
  });
});

// LOGIN USER
export const loginUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Username and password required",
    });
  }

  const { token, user } = await loginUser(username, password);

  res.status(HTTP_STATUS.OK).json({
    message: "Login successful",
    token,
    user,
  });
});

// UPDATE USER
export const updateUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await updateUser(req.user.id, { username, password });

  res.status(HTTP_STATUS.OK).json({
    message: "Profile updated successfully",
    user,
  });
});