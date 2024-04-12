const { z } = require("zod");
const sendOtpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(regex.test(value));
        return regex.test(value);
      },
      { message: "email can't be start with special char and number" }
    ),
  name: z
    .string({ required_error: "Name will be required" })
    .trim()
    .min(3, { message: "At least 3 char in Name" })
    .max(30, { message: "At most 30 char in Name" })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ),
});
const OTPSchema = z.object({
  otp: z
    .number({ message: "OTP must be a 6-digit number" })
    .int()
    .min(100000)
    .max(999999),
});
const signupSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" })
    .refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;
        return regex.test(value);
      },
      { message: "Password Doesn't Correct Format" }
    ),
  confirmpassword: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" })
    .refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;
        return regex.test(value);
      },
      { message: "Password Doesn't Correct Format" }
    ),
});
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        console.log(regex.test(value));
        return regex.test(value);
      },
      { message: "email can't be start with special char and number" }
    ),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" }),
});
const userData = z.object({
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number is not Less than 10" })
    .max(10, { message: "Phone number is not more than 10" })
    .refine(
      (value) => {
        const regex = /^[0-9]+$/;
        return regex.test(value);
      },
      { message: "Phone Number doesn't contain symbol and character" }
    ),
  dateOfBirth: z
    .string()
    .refine(
      (value) => {
        const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return regex.test(value);
      },
      { message: "Invalid date format. Please use dd/mm/yyyy format." }
    )
    .refine(
      (value) => {
        const dateOfBirth = new Date(value);
        const age = new Date().getFullYear() - dateOfBirth.getFullYear();
        return age >= 18 && age <= 80;
      },
      { message: "Date of birth must be between 18 and 80 years old" }
    ),
  fullAddress: z
    .string()
    .trim()
    .min(15, { message: "Address should be atleast 15 char" })
    .max(100, { message: "Address should be atmost 15 char" }),
  pinCode: z.string().refine(
    (value) => {
      const regex = /^\d{6}$/;
      const val = regex.test(value);
      const check = parseInt(value);
      if (val && check.toString().length === 6) return check;
    },
    { message: "Invalid Pincode" }
  ),
  city: z
    .string()
    .trim()
    .min(2, { message: "City should be at least 2 char" })
    .max(50, { message: "City should be atleast 50 Char" }),
  state: z
    .string()
    .trim()
    .min(2, { message: "State should be at least 2 char" })
    .max(20, { message: "State should be atleast 20 Char" }),
  country: z
    .string()
    .trim()
    .min(3, { message: "Country should be at least 3 char" })
    .max(56, { message: "Country should be atleast 56 Char" }),
  doctorType: z.string(),
  speciality: z.string(),
  yearOfexp: z.string().refine((value) => {
    return parseInt(value);
  }),
  consultancyFee: z.string().refine(
    (value) => {
      const val = parseInt(value);
      if (val > 0) {
        return val;
      }
    },
    { message: "Fee will not be 0" }
  ),
  nofAssignPatient: z.string(),
  nofDevice: z
    .string()
    .trim()
    .refine(
      (value) => {
        const val = parseInt(value);
        if (val > 0) {
          return val;
        }
      },
      { message: "Device not be negative" }
    ),
});
module.exports = {
  sendOtpSchema,
  OTPSchema,
  loginSchema,
  signupSchema,
  userData,
};
