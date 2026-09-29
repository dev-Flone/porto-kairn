import { db } from "@/prisma/db";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const username =
      typeof body.username === "string" ? body.username.trim() : "";

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

    if (password.length < 8) {
      return Response.json(
        {
          success: false,
          error: "Password minimal 8 karakter",
        },
        { status: 400 },
      );
    }

    if (username.length > 0 && username.length < 3) {
      return Response.json(
        {
          success: false,
          error: "Username minimal 3 karakter",
        },
        { status: 400 },
      );
    }

    const existingEmail = await db.orm.public.User.first({ email });

    if (existingEmail) {
      return Response.json(
        {
          success: false,
          error: "Email is already registered",
        },
        { status: 400 },
      );
    }

    if (username) {
      const existingUsername = await db.orm.public.User.first({ username });

      if (existingUsername) {
        return Response.json(
          {
            success: false,
            error: "Username is already taken",
          },
          { status: 409 },
        );
      }
    }

    const passwordHash = await hashPassword(password);

    const user = await db.orm.public.User.create({
      email,
      username: username || null,
      passwordHash,
    });
    return Response.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration failed:", error);

    return Response.json(
      {
        success: false,
        error: "Registration failed.",
      },
      { status: 500 },
    );
  }
}
