import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 characters"),
  description: z
    .string()
    .min(10, "Description must be atleast 10 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(5, "Location must be atleast 5 characters")
    .max(400, "The location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
