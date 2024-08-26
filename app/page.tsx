import { Box } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openCounter = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCounter = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCounter = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Box className="space-y-3">
      <LatestIssues />
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
    </Box>
  );
}
