// app/api/members/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { memberUpdateSchema } from "../schema";
import { handleApiError } from "@/lib/api-error";

type Params = {
  params: Promise<{ id: string }>;
};

// GET : Get single member by ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const memberid = Number(id);

    if (isNaN(memberid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberid },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          error: "Not Found",
          message: "Member not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member,
      message: "Member fetched successfully",
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to fetch member",
      },
      { status: 500 }
    );
  }
}

// PUT : Update an existing member
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const memberid = Number(id);
    const body = await request.json();
    // const { name, niat, address, phone } = body;

    if (isNaN(memberid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    // Validation
    const data = memberUpdateSchema.parse(body);

    // Update member
    const updatedMember = await prisma.member.update({
      where: { id: memberid },
      data,
    });

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: "Member updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return handleApiError(error);
  }
}

// DELETE : Delete a member
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const memberid = Number(id);
    if (isNaN(memberid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    // Delete member
    await prisma.member.delete({
      where: { id: memberid },
    });

    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to delete member",
      },
      { status: 500 }
    );
  }
}
