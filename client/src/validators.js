import Joi from "@hapi/joi";

export const loginSchema = Joi.object({
  phone: Joi.string().pattern(new RegExp("^0([0-9]{9})$")).required(),
  password: Joi.string()
    .pattern(new RegExp("^([a-zA-Z0-9]{6,30})$"))
    .required(),
});

export const userUpdateSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30),
  phone: Joi.string().pattern(new RegExp("^0([0-9]{9})$")),
  address: Joi.string().min(6),
});

export const registerSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(50).required(),
  phone: Joi.string().pattern(new RegExp("^0([0-9]{9})$")).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .pattern(new RegExp("^([a-zA-Z0-9]{6,30})$"))
    .required(),
  repeatPassword: Joi.ref("password"),
  address: Joi.string().required(),
});

const itemSchema = Joi.object({
  item: Joi.string().pattern(new RegExp("^([0-9A-Fa-f]{24})$")).required(),
  qty: Joi.number().min(1).required(),
});

export const orderSchema = Joi.object({
  owner: Joi.string().pattern(new RegExp("^[0-9A-Fa-f]{24}$")).required(),
  items: Joi.array().items(itemSchema).min(1).required(),
  shippingAddress: Joi.string().required(),
  phone: Joi.string().pattern(new RegExp("^0([0-9]{9})$")).required(),
  tax: Joi.number().required(),
  totalPrice: Joi.number().required(),
});

export const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  disc: Joi.string().min(10),
  image: Joi.array().items(Joi.string()).min(1),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.string(),
  stock: Joi.number().min(0),
  disc: Joi.string(),
  image: Joi.array().items(Joi.string()),
});
