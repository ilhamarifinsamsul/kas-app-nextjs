import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { transactionUpdateSchema } from "../schema";

interface Params {
  params: {
    id: string;
  };
}

// GET : Get a transaction by ID
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: transaction, // transaction,
      message: "Transaction fetched successfully",
    });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return handleApiError(error);
  }
}

// PUT : Update a transaction by ID
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = transactionUpdateSchema.parse(body);

    // Check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    // Update transaction
    const updateTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        memberId: parsed.memberId ?? undefined,
        amount: parsed.amount ?? undefined,
        description: parsed.description ?? undefined,
        type: parsed.type ?? undefined,
        date: parsed.date ? new Date(parsed.date) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateTransaction, // updateTransaction,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return handleApiError(error);
  }
}

// DELETE : Delete a transaction by ID
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        { status: 400 }
      );
    }

    // Check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!existingTransaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return handleApiError(error);
  }
}
