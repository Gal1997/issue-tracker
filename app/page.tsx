import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const openCounter = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCounter = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCounter = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openCounter}
          inprogress={inProgressCounter}
          closed={closedCounter}
        />
        <IssueChart
          open={openCounter}
          inprogress={inProgressCounter}
          closed={closedCounter}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Gal's Dashboard",
  description: "View a summary of project issues",
};

export const dynamic = "force-dynamic";
