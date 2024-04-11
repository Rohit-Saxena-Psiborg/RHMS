const {z} = require("zod")
const sendOtpSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .trim(),
    name: z
    .string({ required_error: "Name will be required" })
    .trim()
    .min(3, { message: "At least 3 char" })
    .max(30, { message: "At most 30 char" }),
})
const OTPSchema = z.object({
    otp: z.number({message:"OTP must be a 6-digit number"}).int().min(100000).max(999999)
});
const signupSchema = z.object({
    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" }),
    confirmpassword: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" }),
})
const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .trim(),
    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "At least 8 char" })
    .max(20, { message: "At most 20 char" }),
})
const userData = z.object({
    phone: z.string().trim().min(10,{message:"Phone number is not complete"}).max(10,{message:"Phone number is digit is more"}),
    dateOfBirth: z.string().refine(value => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(value);
    }, { message: "Invalid date format. Please use dd/mm/yyyy format." }),
    fullAddress: z.string(),
    pinCode: z.string().refine(value=>{
        const regex = /^\d{6}$/;
        const val = regex.test(value);
        const check = parseInt(value);
        if(val &&check.toString().length===6)
        return check
    },{message:"Invalid Pincode"}),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    doctorType: z.string(),
    speciality: z.string(),
    yearOfexp: z.string().refine(value=>{
        return parseInt(value)
    }),
    consultancyFee: z.string().refine(value=>{
        return parseInt(value)
    }),
    nofAssignPatient: z.string(),
    nofDevice: z.string().refine(value=>{
        return parseInt(value)
    }),
})
module.exports = {sendOtpSchema,OTPSchema ,loginSchema ,signupSchema ,userData}