import prisma from "@/prisma/client";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb="4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(async (issue, index) => (
            <Table.Row key={issue.id}>
              <Table.Cell style={{ boxShadow: index == 4 ? "none" : "" }}>
                <Flex align="center" justify="between" pl="2" p="1">
                  <Box className="space-y-1">
                    <Text as="div" size="2" weight="medium">
                      <Link href={"/issues/" + issue.id}>{issue.title}</Link>
                    </Text>
                    <IssueStatusBadge status={issue.status} />
                  </Box>
                  <Flex
                    direction="column"
                    align="center"
                    className="space-y-1"
                    width="70px"
                  >
                    <Text
                      color="gray"
                      size="1"
                      style={{ display: index == 0 ? "inherit" : "none" }}
                    >
                      Assigned to{" "}
                    </Text>
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback="?"
                      size="4"
                      radius="full"
                    />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
export const dynamic = "force-dynamic";
export default LatestIssues;
