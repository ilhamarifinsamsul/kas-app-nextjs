import { ZodError } from "zod";
import { NextResponse } from "next/server";

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: "VALIDATION_ERROR",
        message: "Form harus diisi semua, dan diisi dengan benar",
        issues: error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "UNKNOWN_ERROR",
      message: "Something went wrong",
    },
    { status: 500 }
  );
}
