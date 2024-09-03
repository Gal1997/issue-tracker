import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
export interface CommentType {
  id: number;
  description: string;
  fromUser: string;
  image: string;
}

const Comment = (comment: CommentType) => {
  return (
    <Box maxWidth={{ md: "47vw" }}>
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={comment.image} radius="large" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {comment.fromUser}
            </Text>
            <Text as="div" size="3" color="gray">
              {comment.description}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Comment;
