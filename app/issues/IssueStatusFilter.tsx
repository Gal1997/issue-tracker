"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value: Status | " " }[] = [
  { label: "All", value: " " },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root onValueChange={() => {}}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          {statuses.map(({ value, label }, index) => (
            <>
              <Select.Item value={value} key={value}>
                {label}
              </Select.Item>
              {index == 0 && <Select.Separator />}
            </>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
