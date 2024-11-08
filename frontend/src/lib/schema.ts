import { z } from "zod";

export const registerSchema = z.object({
  restaurantName: z
    .string()
    .min(3, { message: "Restaurant name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  profilePicture: z.instanceof(File).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const OtpSchema = z.object({
  otp: z.string().min(6, { message: "Invalid OTP , OTP must be of length 6" }),
});

export const MenuItemSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  price: z
    .string()
    .min(1, { message: "Price must be at least 1 character long" })
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0",
    }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters long" }),
  isBestSeller: z.boolean().optional(),
  image: z.union([z.instanceof(File), z.string().url()]).nullable(),
});

export const ownerSchema = z.object({
  ownerName: z
    .string()
    .min(3, "Onwer name must be at least 3 character")
    .optional(),
  restaurantName: z.string().min(3, "Restaurant name is required"),
  phoneNumber: z
    .string()
    .min(10, "phoneNumber number must be at least 10 digits")
    .optional(),
  address: z.string().min(1, "Address is required").optional(),
  email: z.string().email("Invalid email address"),
  profilePicture: z.instanceof(File || String).optional(),
});
