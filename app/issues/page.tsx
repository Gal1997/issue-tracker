import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let method: "asc" | "desc";
  if (searchParams.method == "asc" || searchParams.method == "desc")
    method = searchParams.method;
  else method = "asc";
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: method }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <div className="space-y-6">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      ></Pagination>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Issues;

export const metadata: Metadata = {
  title: "Issue List",
  description: "View all project issues",
};
