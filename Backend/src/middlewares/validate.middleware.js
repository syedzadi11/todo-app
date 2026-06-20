import { HTTP_STATUS } from "../constants/http-status.constant.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};