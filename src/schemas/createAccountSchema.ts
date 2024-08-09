import { z } from "zod";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Please enter a valid first name" })
    .max(50),

  email: z.string().email(),
  role: z.string(),
  password: z.string().min(8).max(50),
  employeeID: z.string().min(3).max(50),
  contactNumber: z
    .string()
    .min(10, { message: "Phone number must be of 10 digits" })
    .max(10, { message: "Phone number must be of 10 digits" }),
  confirmPassword: z.string().min(8).max(50),
});

export type createAccountType = z.infer<typeof createAccountSchema>;
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
export type LoginType = z.infer<typeof LoginSchema>;
