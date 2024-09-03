"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  async function deleteIssue() {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueID}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  }
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger style={{ width: "130px" }}>
          <Button color="red" disabled={isDeleting}>
            <FaRegTrashCan />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="330px">
          <AlertDialog.Title>Delete issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {"Are you sure? This cannot be undone"}
          </AlertDialog.Description>

          <Flex width="220px" mt="5" justify="between">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
        <AlertDialog.Root open={error}>
          <AlertDialog.Content maxWidth="400px">
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description size="2">
              {"Unable to remove issue. (Probably back-end issue)"}
            </AlertDialog.Description>

            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
                mt="3"
              >
                Back
              </Button>
            </AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
