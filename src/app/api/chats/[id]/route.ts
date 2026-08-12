import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unauthorized. Please login first.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat ID is required.",
        },
        { status: 400 }
      );
    }

    const chat =
      await prisma.chat.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            select: {
              id: true,
              role: true,
              content: true,
              createdAt: true,
            },
          },
        },
      });

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(
      "Chat fetch error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load chat.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unauthorized. Please login first.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat ID is required.",
        },
        { status: 400 }
      );
    }

    const chat =
      await prisma.chat.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat not found.",
        },
        { status: 404 }
      );
    }

   const deletedChat =
  await prisma.chat.deleteMany({
    where: {
      id: chat.id,
      userId: session.user.id,
    },
  });

if (deletedChat.count === 0) {
  return NextResponse.json(
    {
      success: false,
      error: "Chat was already deleted.",
    },
    { status: 404 }
  );
}

    return NextResponse.json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Chat delete error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete chat.",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unauthorized. Please login first.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat title is required.",
        },
        { status: 400 }
      );
    }

    const chat =
      await prisma.chat.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: "Chat not found.",
        },
        { status: 404 }
      );
    }

    const updatedChat =
      await prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          title,
        },
        select: {
          id: true,
          title: true,
        },
      });

    return NextResponse.json({
      success: true,
      chat: updatedChat,
    });
  } catch (error) {
    console.error(
      "Chat rename error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to rename chat.",
      },
      { status: 500 }
    );
  }
}