import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import schema from "../../validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Can't add issue without being logged in." },
      { status: 401 }
    );

  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success)
    return NextResponse.json({ error: validate.error.errors }, { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { title: body.title } });
  if (issue) {
    return NextResponse.json(
      { error: "Issue with this title already exists" },
      { status: 409 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
