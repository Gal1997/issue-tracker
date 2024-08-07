import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";

interface Props {
  params: { issueID: string };
}

const EditIssuePage = async ({ params: { issueID } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueID) },
  });
  if (!issue) notFound();
  if (issue != null) return <IssueForm issue={issue} />;
};

export default EditIssuePage;
