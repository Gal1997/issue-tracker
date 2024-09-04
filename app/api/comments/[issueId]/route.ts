import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

interface Props {
  params: { id: string };
}

// export async function GET(
//   //request: NextRequest,
//   { params: { id } }: { params: { id: string } }
// ) {
//   const allCommentsOfSpecificIssue = await prisma.comments.findMany({
//     where: { assignedToIssueId: id },
//     orderBy: { createdAt: "asc" },
//   });
//   return NextResponse.json(allCommentsOfSpecificIssue);
// }

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Requester is logged in
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Can't add issue without being logged in." },
      { status: 401 }
    );
  const body = await request.json();
  const { message, assignedToIssueId, madeByEmail } = body;

  const comm = await prisma.comments.create({
    data: {
      assignedToIssueId: assignedToIssueId,
      message: message,
      madeByEmail: madeByEmail,
    },
  });
  return NextResponse.json("comm", { status: 201 });
}

export const dynamic = "force-dynamic";
