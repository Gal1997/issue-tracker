import { Comments as DBComment } from "@prisma/client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface DBCommentShape {
  comment: {
    madeByUser: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
    } | null;
  } & {
    id: number;
    message: string;
    createdAt: Date;
    assignedToIssueId: string;
    madeByEmail: string;
  };
}

const Comment = ({ comment }: DBCommentShape) => {
  return (
    <Box maxWidth={{ md: "47vw" }}>
      <Card>
        <Flex gap="3" align="center">
          <Avatar
            size="5"
            src={comment.madeByUser?.image!}
            radius="large"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {comment.madeByUser?.name!.charAt(0).toUpperCase()}
              {comment.madeByUser?.name!.slice!(1)}
            </Text>
            <Text as="div" size="1" weight="light">
              {comment.createdAt.toLocaleDateString()}
            </Text>
            <Text as="div" size="3">
              {comment.message.charAt(0).toUpperCase()}
              {comment.message.slice!(1)}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Comment;
