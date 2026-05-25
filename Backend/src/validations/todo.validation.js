import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  is_completed: Joi.boolean().optional()
});

