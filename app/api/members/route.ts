// app/api/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET : List all members
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({
      success: true,
      data: members,
      message: "Members fetched successfully",
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to fetch members",
      },
      { status: 500 }
    );
  }
}

// POST : Create a new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, niat, address, phone } = body;

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

    // Check for duplicate niat
    const existingMember = await prisma.member.findFirst({
      where: { niat },
    });

    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate",
          message: "Member with this niat already exists",
        },
        { status: 409 }
      );
    }

    const newMember = await prisma.member.create({
      data: {
        name,
        niat,
        address,
        phone,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newMember,
        message: "Member created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "Failed to create member",
      },
      { status: 500 }
    );
  }
}
