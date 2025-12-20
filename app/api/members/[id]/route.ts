// app/api/members/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET : Get single member by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
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
      where: { id },
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
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, niat, address, phone } = body;

    if (isNaN(id)) {
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
    if (!name || !niat || !address || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        {
          success: false,
          error: "Not Found",
          message: "Member not found",
        },
        { status: 404 }
      );
    }

    // Check for duplicate niat (if niat is being changed)
    if (niat !== existingMember.niat) {
      const duplicateNiat = await prisma.member.findFirst({
        where: { niat },
      });

      if (duplicateNiat) {
        return NextResponse.json(
          {
            success: false,
            error: "Duplicate",
            message: "Another member with this niat already exists",
          },
          { status: 409 }
        );
      }
    }

    // Update member
    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        name,
        niat,
        address,
        phone,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: "Member updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to update member",
      },
      { status: 500 }
    );
  }
}

// DELETE : Delete a member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        {
          success: false,
          error: "Not Found",
          message: "Member not found",
        },
        { status: 404 }
      );
    }

    // Delete member
    await prisma.member.delete({
      where: { id },
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
