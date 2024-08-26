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

interface Props {
  open: number;
  closed: number;
  inprogress: number;
}

const IssueSummary = async ({ open, closed, inprogress }: Props) => {
  const myArray: counterCard[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    {
      label: "In-progress Issues",
      value: inprogress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closed, status: Status.CLOSED },
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
