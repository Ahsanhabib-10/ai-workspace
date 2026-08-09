import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.knowledgeDocument.count();

    return NextResponse.json({
      success: true,
      message: "Database connection successful.",
      documents: count,
    });
  } catch (error) {
    console.error("Database test error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Database connection failed.",
      },
      { status: 500 }
    );
  }
}