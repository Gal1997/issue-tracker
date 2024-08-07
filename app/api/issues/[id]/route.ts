import schema from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(
      { error: validate.error.format() },
      { status: 400 }
    );

  const oldIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!oldIssue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const newIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

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
