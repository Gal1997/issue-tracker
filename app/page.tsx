import { Box } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <Box className="space-y-3">
      <LatestIssues />
      <IssueSummary />
    </Box>
  );
}
