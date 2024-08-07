import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Heading, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading className="mb-2">{issue.title}</Heading>
      <IssueStatusBadge status={issue?.status}></IssueStatusBadge>
      <Text className="ml-3">{issue?.createdAt.toDateString()}</Text>
      <Card className="mt-4">
        <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
