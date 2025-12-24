import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { transactionUpdateSchema } from "../schema";

// GET : Get a transaction by ID
export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const transactionid = Number(id);

    if (isNaN(transactionid)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction ID",
        },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionid },
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
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const transactionid = Number(id);
    if (isNaN(transactionid)) {
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
      where: { id: transactionid },
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
      where: { id: transactionid },
      data: {
        memberId: parsed.memberId,
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
export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const transactionid = Number(id);

    if (isNaN(transactionid)) {
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
      where: { id: transactionid },
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
      where: { id: transactionid },
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
