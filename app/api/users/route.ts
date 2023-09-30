import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { UserMinLengthPassword } from "@/enum/users";

export async function GET(req: Request) {
  return NextResponse.json({ okai: true });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  if (!email)
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  if (!password)
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  if (password.length < UserMinLengthPassword)
    return NextResponse.json(
      { message: "Password is too weak" },
      { status: 400 }
    );
  const hashedPassword = await bcrypt.hash(password, 12);
  const userAlreadyExist = await prismadb.user.findMany({
    where: {
      email,
    },
  });

  // userAlreadyExist is an array
  if (userAlreadyExist.length !== 0)
    return NextResponse.json(
      { message: "User already exist with this email." },
      { status: 400 }
    );

  const user = await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(user, { status: 201 });
}
