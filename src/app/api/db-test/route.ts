import { db } from "@/prisma/db";

export async function GET() {
  try {
    const notes = await db.orm.public.Note.where({ userId: 1 }).all();

    return Response.json({
      succes: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
}
