import z from "zod";

export const memberCreateSchema = z.object({
  name: z.string().min(3, "Name is required"),
  niat: z.string().min(3, "Niat is required"),
  address: z.string().min(3, "Address is required"),
  phone: z.string().min(10, "Phone number is required"),
});

export const memberUpdateSchema = memberCreateSchema;
