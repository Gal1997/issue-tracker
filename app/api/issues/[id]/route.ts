import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

interface Props {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Requester is logged in
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Can't patch issue without being logged in." },
      { status: 401 }
    );

  const body = await request.json();
  // The request body is valid (by rules we defined)
  const validate = patchIssueSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(
      { error: validate.error.format() },
      { status: 400 }
    );

  const { assignedToUserId, title, description } = body;
  // The user the issue is assigned to exist in db
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  // The issue itself , exist in db
  const oldIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!oldIssue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Update the issue and also store the object in 'newIssue' (not necessary)
  const newIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      description: description,
      assignedToUserId,
    },
  });

  return NextResponse.json(newIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Can't delete issue without being logged in." },
      { status: 401 }
    );
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  // await delay(2000); Shows the delete-issue spinner

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ status: 204 });
}
