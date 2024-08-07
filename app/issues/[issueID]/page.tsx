import { IssueStatusBadge } from "@/app/components/index";
import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
  //await delay(2000); // Add this to see the loading page
  return (
    <div>
      <Heading className="mb-2">{issue.title}</Heading>
      <IssueStatusBadge status={issue?.status}></IssueStatusBadge>
      <Text className="ml-3">{issue?.createdAt.toDateString()}</Text>

      <Card className="mt-4">
        <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
