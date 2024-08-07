import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { issueID: string };
}

const EditIssuePage = async ({ params: { issueID } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueID) },
  });
  if (!issue) notFound();
  if (issue != null) return <IssueForm issue={issue} />;
};

export default EditIssuePage;
