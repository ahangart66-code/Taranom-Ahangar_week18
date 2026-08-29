import * as yup from "yup";

export const contactSchema = yup.object({
  id: yup.string(),

  name: yup
    .string()
    .trim()
    .required("Name is required"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email (e.g., test@gmail.com)"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{11}$/,
      "Phone must be exactly 11 digits"
    ),
});

