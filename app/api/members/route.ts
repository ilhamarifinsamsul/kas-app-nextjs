// app/api/members/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { memberCreateSchema } from "./schema";
import { handleApiError } from "@/lib/api-error";
import { success } from "zod";

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
    return handleApiError(error);
  }
}

// POST : Create a new member
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ZOD Validation
    const data = memberCreateSchema.parse(body);

    // Check for duplicate niat
    const duplicate = await prisma.member.findFirst({
      where: { niat: data.niat },
    });
    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "Conflict",
          message: "Niat Tidak Boleh Sama Dengan Anggota Lain",
        },
        { status: 409 }
      );
    }

    const newMember = await prisma.member.create({
      data,
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
    return handleApiError(error);
  }
}
