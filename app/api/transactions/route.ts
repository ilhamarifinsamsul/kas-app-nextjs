import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { transactionCreateSchema } from "./schema";

// GET : List all transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: transactions, // 👈 FIX transactions,
      message: "Transactions fetched successfully",
    });
  } catch (error) {
    console.error("GET Error:", error);
    return handleApiError(error);
  }
}

// POST : Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = transactionCreateSchema.parse(body);

    const newTransaction = await prisma.transaction.create({
      data: {
        memberId: parsed.memberId ?? null,
        amount: parsed.amount,
        description: parsed.description ?? null,
        type: parsed.type,
        date: parsed.date ? new Date(parsed.date) : new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newTransaction, // newTransaction,
        message: "Transaction created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return handleApiError(error);
  }
}
