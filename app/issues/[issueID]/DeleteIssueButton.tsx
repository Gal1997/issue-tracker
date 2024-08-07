"use client";
import { Button } from "@radix-ui/themes";
import { FaRegTrashCan } from "react-icons/fa6";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        color="red"
        onClick={async () => {
          await axios.delete(`/api/issues/${issueID}`);
          router.push("/issues");
          router.refresh();
        }}
      >
        <FaRegTrashCan />

        {"Delete Issue "}
      </Button>
    </div>
  );
};

export default DeleteIssueButton;
