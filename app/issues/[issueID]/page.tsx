import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import Comment from "@/app/components/Comment";
import AddComment from "@/app/components/AddComment";
import { CommentType } from "@/app/components/Comment";

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
  const comments: CommentType[] = [
    {
      id: 1,
      description: "This is my comment",
      fromUser: "galisraeli97@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKr-CTPa9HdA-H4sYB7QhhFalA3XZ_JkKySu40k7_hMsnmZZg=s96-c",
    },
    {
      id: 2,
      description:
        "This is another comment that happens to be very long to test how long comments look",
      fromUser: "nockout10@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocICtgBUzRG4n2Ws9h02T2n8fYGq31oxsP1S1xDtQOn2Dnv4XHk=s96-c",
    },
  ];
  if (paramsIsNOTaNumber) notFound();
  const issue = await fetchUser(parseInt(issueID));
  if (!issue) notFound();

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <IssueDetails issue={issue} />
        </Box>
        <Flex justify={{ initial: "center", md: "start" }}>
          <Box width="250px">
            <Box className="space-y-1 max-lg:text-center" mb="4">
              <Text color="gray" size="2">
                Assign Issue to user
              </Text>
              <AssigneeSelect issue={issue} />
            </Box>
            <Flex direction={{ initial: "row", md: "column" }} gap={"3"}>
              <EditIssueButton issueID={parseInt(issueID)} />
              <DeleteIssueButton issueID={parseInt(issueID)} />
            </Flex>
          </Box>
        </Flex>
      </Grid>

      <Flex mt="7" direction="column">
        <AddComment />
      </Flex>
      <Flex mt="6" direction="column" gap="5">
        {comments.map((comment) => (
          <Comment {...comment} key={comment.id} />
        ))}
      </Flex>
    </>
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
