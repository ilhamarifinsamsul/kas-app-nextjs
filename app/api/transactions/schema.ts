import { z } from "zod";

/**
 * Enum TransactionType
 * Harus sama dengan Prisma enum
 */
export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);

/**
 * CREATE Transaction Schema
 */
export const transactionCreateSchema = z.object({
  memberId: z.number().int().positive().optional().nullable(),

  amount: z
    .number({
      message: "Amount harus berupa angka",
    })
    .positive("Amount harus lebih dari 0"),

  description: z
    .string()
    .max(255, "Deskripsi maksimal 255 karakter")
    .optional()
    .nullable(),

  type: transactionTypeEnum,

  date: z.string().datetime("Format tanggal tidak valid").optional(),
});

/**
 * UPDATE Transaction Schema
 * (semua optional, karena update parsial)
 */
export const transactionUpdateSchema = transactionCreateSchema.partial();
