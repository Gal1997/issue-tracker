import prisma from "@/prisma/client";
import { notFound, useParams } from "next/navigation";
import React from "react";

interface Props {
  params: { issueID: string };
}

const IssueDetailPage = async ({ params: { issueID } }: Props) => {
  const paramsIsNOTaNumber = isNaN(+issueID);
  if (paramsIsNOTaNumber) notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueID),
    },
  });
  if (!issue) notFound();
  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.description}</p>
      <p>{issue?.status}</p>
      <p>{issue?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
