"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FaRegTrashCan } from "react-icons/fa6";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <FaRegTrashCan />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="330px">
          <AlertDialog.Title>Delete issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {"Are you sure? This cannot be undone."}
          </AlertDialog.Description>

          <Flex width="220px" mt="5" justify="between">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gold">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  await axios.delete(`/api/issues/${issueID}`);
                  router.push("/issues");
                  router.refresh();
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
