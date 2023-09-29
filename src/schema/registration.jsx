import * as yup from "yup";

export const registrationSchema = (type) =>
  yup.object().shape({
    email: yup.string().email().required(),
    full_name: type === "register" ? yup.string().required() : yup.string(),

    password: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("confirmPassword"), null], "Passwords must match"),
    confirmPassword: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    is_admin: yup.boolean(),
  });
