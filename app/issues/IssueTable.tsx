import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import { IssueStatusBadge } from "../components";
import { useState } from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  method: string;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface" style={{ maxWidth: "100vw" }}>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
              width={"100vw"}
            >
              {}
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    method:
                      column.value == "status"
                        ? "asc"
                        : searchParams.method == "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                searchParams.method == "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.method == "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={"/issues/" + issue.id}>{issue.title}</Link>
              <div className="block md:hidden">
                {" "}
                <IssueStatusBadge
                  status={issue.status}
                  issueId={issue.id}
                  description={issue.description}
                  title={issue.title}
                />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge
                status={issue.status}
                issueId={issue.id}
                description={issue.description}
                title={issue.title}
              />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

export default IssueTable;
