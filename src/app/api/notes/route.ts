import { getCurrentUser } from "@/lib/auth";
import { db } from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Unauthoraized",
        },
        { status: 401 },
      );
    }
    const body = await request.json();

    const title = typeof body.title === "string" ? body.title.trim() : "";

    const content = typeof body.content === "string" ? body.content : null;

    if (!title) {
      return Response.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 },
      );
    }
    const note = await db.orm.public.Note.create({
      userId: user.id,
      title,
      content,
    });

    return Response.json(
      {
        success: true,
        note,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create note failed.", error);

    return Response.json(
      {
        success: false,
        error: "Failed to create note",
      },
      { status: 500 },
    );
  }
}
