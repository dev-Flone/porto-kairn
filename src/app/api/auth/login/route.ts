import { db } from "@/prisma/db";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          error: "Email dan password wajib diisi",
        },
        { status: 400 },
      );
    }

    const user = await db.orm.public.User.first({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Email atau password salah",
        },
        { status: 401 },
      );
    }

    const passwordValid = await verifyPassword(user.passwordHash, password);

    if (!passwordValid) {
      return Response.json(
        {
          success: false,
          error: "Email atau passwod salah",
        },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);

    return Response.json(
      {
        success: false,
        error: "Login failed",
      },
      { status: 500 },
    );
  }
}
