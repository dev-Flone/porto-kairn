import { getCurrentUser } from "@/lib/auth";
import { db } from "@/prisma/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    const noteId = Number(id);

    if (!Number.isInteger(noteId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid note iD",
        },
        { status: 400 },
      );
    }

    const note = await db.orm.public.Note.first({
      id: noteId,
    });

    if (!note || note.userId !== user.id) {
      return Response.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 },
      );
    }

    const body = await request.json();

    const title = typeof body.title === "string" ? body.title : "";

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

    const updateNote = await db.orm.public.Note.where({ id: noteId }).update({
      title,
      content,
    });

    return Response.json({
      succes: true,
      note: updateNote,
    });
  } catch (error) {
    console.error("Update Note failed", error);

    return Response.json(
      {
        success: false,
        error: "Update note failed",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await context.params;
    const noteId = Number(id);

    if (!Number.isInteger(noteId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid note ID",
        },
        { status: 400 },
      );
    }

    const note = await db.orm.public.Note.first({
      id: noteId,
    });

    if (!note || note.userId !== user.id) {
      return Response.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 },
      );
    }

    await db.orm.public.Note.where({ id: noteId }).delete();

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete note failed:", error);

    return Response.json(
      {
        success: false,
        erro: "Failed to delete note",
      },
      { status: 500 },
    );
  }
}
