import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return <div>{session?.user?.email}</div>;
}
