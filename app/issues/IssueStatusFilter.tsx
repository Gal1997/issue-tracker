"use client";
import { Status } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: Status | " " }[] = [
  { label: "All", value: " " },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const statusesValues = Object.values(Status);
  var status = searchParams.get("status");
  if (!statusesValues.includes(status as Status)) status = null;
  return (
    <Select.Root
      defaultValue={status || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status != " ") params.append("status", status);
        if (searchParams.get("pageSize"))
          params.append("pageSize", searchParams.get("pageSize")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("method"))
          params.append("method", searchParams.get("method")!);

        const query = params.size > 0 ? "?" + params.toString() : "";
        router.push("issues/" + query);
        router.refresh();
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          {statuses.map(({ value, label }, index) => (
            <Box key={value}>
              <Select.Item value={value}>{label}</Select.Item>
              {index == 0 && <Select.Separator />}
            </Box>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
