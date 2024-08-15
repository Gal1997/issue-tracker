import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeSelect from "./AssigneeSelect";

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

export default IssueDetailPage;
