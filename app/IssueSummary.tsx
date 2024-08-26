import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import Link from "./components/Link";

interface counterCard {
  label: string;
  value: number;
  status: Status;
}

const IssueSummary = async () => {
  const openCounter = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCounter = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCounter = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const myArray: counterCard[] = [
    { label: "Open Issues", value: openCounter, status: Status.OPEN },
    {
      label: "In-progress Issues",
      value: inProgressCounter,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closedCounter, status: Status.CLOSED },
  ];
  return (
    <Flex gap="4">
      {myArray.map((item) => (
        <Card key={item.status}>
          <Text as="div" size="2" weight="medium">
            <Link href={"issues?status=" + item.status}>{item.label}</Link>
          </Text>
          <Text as="div" size="5" weight="bold">
            {item.value}
          </Text>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
