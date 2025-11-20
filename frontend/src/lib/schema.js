import { z } from "zod";

//task schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters")
    .max(100, "Title too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),

  status: z.enum(["pending", "in-progress", "completed"], {
    required_error: "Status is required",
  }),
});

//profile schema
export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  number: z
    .string()
    .regex(/^[0-9]+$/, "Phone must contain only digits")
    .length(10, "Phone number must be exactly 10 digits"),

  age: z
    .string()
    .regex(/^[0-9]+$/, "Age must be numeric")
    .min(1, "Age is required"),
});
