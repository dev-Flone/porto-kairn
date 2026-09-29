import "server-only";

import { db } from "@/prisma/db";
import { getSession } from "@/lib/session";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await db.orm.public.User.first({
    id: session.userId,
  });

  return user ?? null;
}
