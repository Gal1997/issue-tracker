import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import schema from "../../validationSchema";

interface issue {
  title: string;
  description: string;
}

export async function POST(request: NextRequest) {
  const body: issue = await request.json();
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
