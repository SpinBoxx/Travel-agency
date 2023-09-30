import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await prismadb.user.create({
    data: {
      username: "Alice",
      email: "alice@prisma.io",
      password: "quentin",
    },
  });
  return NextResponse.json({ user });
}
