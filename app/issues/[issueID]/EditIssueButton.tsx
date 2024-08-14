import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueID }: { issueID: number }) => {
  return (
    <Box>
      <Button style={{ width: "100%" }}>
        <Pencil2Icon />
        <Link href={"/issues/" + issueID + "/edit"}>Edit Issue</Link>
      </Button>
    </Box>
  );
};

export default EditIssueButton;
