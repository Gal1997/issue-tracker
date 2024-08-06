import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Heading, Card, Text } from "@radix-ui/themes";
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
      <Heading className="mb-2">{issue.title}</Heading>
      <IssueStatusBadge status={issue?.status}></IssueStatusBadge>
      <Text className="ml-3">{issue?.createdAt.toDateString()}</Text>

      <Card className="mt-2">{issue.description}</Card>
    </div>
  );
};

export default IssueDetailPage;
