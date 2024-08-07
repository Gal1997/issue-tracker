import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Card, Text, Box, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactMarkdown from "react-markdown";
import delay from "delay";

const LoadingIssueDetailPage = async () => {
  return (
    <Box>
      <Skeleton width="12%" height="30px" className="mb-2" />

      <Flex className="space-x-3">
        <Skeleton width="3rem" height="20px" />
        <Skeleton width="8rem" height="20px" />
      </Flex>
      <Card className="mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
