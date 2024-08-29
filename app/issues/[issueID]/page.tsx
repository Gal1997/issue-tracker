import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { issueID: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailPage = async ({ params: { issueID } }: Props) => {
  const paramsIsNOTaNumber = isNaN(+issueID);
  if (paramsIsNOTaNumber) notFound();
  const issue = await fetchUser(parseInt(issueID));
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box className="space-y-3" width="190px">
        <AssigneeSelect issue={issue} />
        <EditIssueButton issueID={parseInt(issueID)} />
        <DeleteIssueButton issueID={parseInt(issueID)} />
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.issueID));
  return {
    title: issue?.title,
    description: "Details of issue #" + issue?.id,
  };
}

export default IssueDetailPage;

export const dynamic = "force-dynamic";
