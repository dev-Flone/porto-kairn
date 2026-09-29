import { deleteSession } from "@/lib/session";

export async function POST() {
  try {
    await deleteSession();

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Logout failed:", error);

    return Response.json(
      {
        success: false,
        error: "Logout failed",
      },
      { status: 500 },
    );
  }
}
