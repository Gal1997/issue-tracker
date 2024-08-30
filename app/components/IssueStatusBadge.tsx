"use client";
import { Spinner } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Badge, Tooltip } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const statusMap: Record<
  Status,
  {
    label: string;
    nextLabel: string;
    color: "red" | "violet" | "cyan" | "orange" | "green";
    variant: "soft" | "solid";
  }
> = {
  OPEN: {
    label: "Open",
    nextLabel: "In Progress",
    color: "red",
    variant: "soft",
  },
  CLOSED: {
    label: "Closed",
    nextLabel: "Open",
    color: "green",
    variant: "soft",
  },
  IN_PROGRESS: {
    label: "In Progress",
    nextLabel: "Closed",
    color: "violet",
    variant: "soft",
  },
};
type Props = {
  title?: Issue["title"];
  description?: Issue["description"];
  issueId?: Issue["id"];
  status: Issue["status"];
};

const IssueStatusBadge = ({ status, issueId, title, description }: Props) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isSettingStatus, setIsSettingStatus] = useState(false);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);
  const handleClick = async () => {
    let newStatus: Status;
    switch (currentStatus) {
      case "OPEN":
        newStatus = "IN_PROGRESS";

        break;
      case "IN_PROGRESS":
        newStatus = "CLOSED";

        break;
      case "CLOSED":
        newStatus = "OPEN";

        break;
      default:
        newStatus = currentStatus;
        break;
    }

    try {
      setIsSettingStatus(true);
      await axios.patch("/api/issues/" + issueId, {
        title: title,
        description: description,
        status: newStatus,
      });
      setCurrentStatus(newStatus);
    } catch (error) {
      setIsSettingStatus(false);
      console.error(error);
    }
    setIsSettingStatus(false);
  };

  return (
    <>
      {issueId && (
        <Tooltip
          className="!opacity-100"
          delayDuration={0}
          content={`Switch Status to: ${statusMap[currentStatus].nextLabel}`}
          disableHoverableContent={true}
        >
          <Badge
            className="transition-all duration-300 hover:cursor-pointer hover:shadow"
            variant={statusMap[currentStatus].variant}
            onClick={handleClick}
            radius="large"
            color={statusMap[currentStatus].color}
          >
            {statusMap[currentStatus].label}{" "}
            {isSettingStatus ? <Spinner /> : null}
          </Badge>
        </Tooltip>
      )}
      {!issueId && (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
      )}
    </>
  );
};

export default IssueStatusBadge;
