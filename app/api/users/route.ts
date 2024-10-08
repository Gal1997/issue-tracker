import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(allUsers);
}
export const dynamic = "force-dynamic";
