import Joi from "joi";

export const registerSchema = Joi.object({
  first_name: Joi.string().min(2).required().messages({
    "string.min": "First name must be at least 2 characters long.",
    "any.required": "First name is required."
  }),
  last_name: Joi.string().min(2).required().messages({
    "string.min": "Last name must be at least 2 characters long.",
    "any.required": "Last name is required."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required."
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required."
  }),
  phone: Joi.string().pattern(/^\+?\d{9,15}$/).required().messages({
    "string.pattern.base": "Please enter a valid phone number.",
    "any.required": "Phone number is required."
  }),
  region: Joi.string().required().messages({
    "any.required": "Region is required."
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required."
  }),
  street: Joi.string().required().messages({
    "any.required": "Street is required."
  }),
  description: Joi.string().min(10).required().messages({
    "string.min": "Description must be at least 10 characters long.",
    "any.required": "Description is required."
  }),
  avatar: Joi.any().required().messages({
    "any.required": "Image is required",
    "any.empty": "The image must not be empty",
  })
});

export const createCarSchema = Joi.object({
  brand_id: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"brand_id" is required',
      'number.base': '"brand_id" must be a number',
      'number.integer': '"brand_id" must be an integer',
    }),
  
  model_name: Joi.string()
    .required()
    .messages({
      'any.required': '"model_name" is required',
      'string.base': '"model_name" must be a string',
      'string.empty': '"model_name" cannot be empty',
    }),
  
  color: Joi.string()
    .required()
    .messages({
      'any.required': '"color" is required',
      'string.base': '"color" must be a string',
      'string.empty': '"color" cannot be empty',
    }),

  acceleration: Joi.string()
    .required()
    .messages({
      'any.required': '"acceleration" is required',
      'string.base': '"acceleration" must be a string',
      'string.empty': '"acceleration" cannot be empty',
    }),

  max_speeds: Joi.string()
    .required()
    .messages({
      'any.required': '"max_speeds" is required',
      'string.base': '"max_speeds" must be a string',
      'string.empty': '"max_speeds" cannot be empty',
    }),

  fuelType: Joi.string()
    .required()
    .messages({
      'any.required': '"fuelType" is required',
      'string.base': '"fuelType" must be a string',
      'string.empty': '"fuelType" cannot be empty',
    }),

  transmission: Joi.string()
    .required()
    .messages({
      'any.required': '"transmission" is required',
      'string.base': '"transmission" must be a string',
      'string.empty': '"transmission" cannot be empty',
    }),

  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'any.required': '"year" is required',
      'number.base': '"year" must be a number',
      'number.integer': '"year" must be an integer',
      'number.min': '"year" cannot be less than 1900',
      'number.max': `"year" cannot be greater than ${new Date().getFullYear()}`,
    }),

  car_hp: Joi.string()
    .required()
    .messages({
      'any.required': '"car_hp" is required',
      'string.base': '"car_hp" must be a string',
      'string.empty': '"car_hp" cannot be empty',
    }),

  motor_liter: Joi.string()
    .required()
    .messages({
      'any.required': '"motor_liter" is required',
      'string.base': '"motor_liter" must be a string',
      'string.empty': '"motor_liter" cannot be empty',
    }),

  count: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': '"count" is required',
      'number.base': '"count" must be a number',
      'number.integer': '"count" must be an integer',
      'number.min': '"count" must be at least 1',
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': '"price" is required',
      'number.base': '"price" must be a number',
      'number.positive': '"price" must be a positive number',
    }),

  description: Joi.string()
    .required()
    .messages({
      'any.required': '"description" is required',
      'string.base': '"description" must be a string',
      'string.empty': '"description" cannot be empty',
    }),

  status: Joi.string()
    .valid('available', 'sold', 'rented')
    .default('available')
    .messages({
      'string.base': '"status" must be a string',
      'any.only': '"status" must be one of [available, sold, rented]',
    }),
});

export const carsCreditValidation = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
    "number.empty": "User ID cannot be empty",
  }),
  car_id: Joi.number().integer().required().messages({
    "any.required": "Car ID is required",
    "number.base": "Car ID must be a number",
    "number.empty": "Car ID cannot be empty",
  }),
  total_price: Joi.number().required().messages({
    "any.required": "Total price is required",
    "number.base": "Total price must be a number",
    "number.empty": "Total price cannot be empty",
  }),
  down_payment: Joi.number().required().messages({
    "any.required": "Down payment is required",
    "number.base": "Down payment must be a number",
    "number.empty": "Down payment cannot be empty",
  }),
  monthly_payment: Joi.number().required().messages({
    "any.required": "Monthly payment is required",
    "number.base": "Monthly payment must be a number",
    "number.empty": "Monthly payment cannot be empty",
  }),
  month_count: Joi.number().integer().required().messages({
    "any.required": "Month count is required",
    "number.base": "Month count must be a number",
    "number.empty": "Month count cannot be empty",
  }),
  interest_rate: Joi.number().required().messages({
    "any.required": "Interest rate is required",
    "number.base": "Interest rate must be a number",
    "number.empty": "Interest rate cannot be empty",
  }),
  start_date: Joi.date().required().messages({
    "any.required": "Start date is required",
    "date.base": "Start date must be a valid date",
    "date.empty": "Start date cannot be empty",
  }),
  end_date: Joi.date().required().messages({
    "any.required": "End date is required",
    "date.base": "End date must be a valid date",
    "date.empty": "End date cannot be empty",
  }),
  status: Joi.string().valid("active", "completed", "cancelled").default("active").messages({
    "string.base": "Status must be a string",
    "any.only": "Status must be one of: active, completed, or cancelled",
  }),
});

export const paymentValidation = Joi.object({
  car_credit_id: Joi.number().integer().required().messages({
    "any.required": "Car credit ID is required",
    "number.base": "Car credit ID must be a number",
    "number.empty": "Car credit ID cannot be empty",
  }),
  due_date: Joi.date().required().messages({
    "any.required": "Due date is required",
    "date.base": "Due date must be a valid date",
    "date.empty": "Due date cannot be empty",
  }),
  amount: Joi.number().required().messages({
    "any.required": "Amount is required",
    "number.base": "Amount must be a number",
    "number.empty": "Amount cannot be empty",
  }),
  paid_amount: Joi.number().required().messages({
    "any.required": "Paid amount is required",
    "number.base": "Paid amount must be a number",
    "number.empty": "Paid amount cannot be empty",
  }),
  status: Joi.string().valid("pending", "paid", "late").default("pending").messages({
    "any.only": "Status must be one of: pending, paid, or late",
    "string.base": "Status must be a string",
  }),
});


export const adminValidation = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty"
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty"
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty"
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters"
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone number is required",
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number cannot be empty"
  }),
});

