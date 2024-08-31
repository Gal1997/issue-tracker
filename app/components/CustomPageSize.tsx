"use client";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  totalNumOfIssue: number;
}

const CustomPageSize = ({ totalNumOfIssue }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  var value = 10;
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <p
          color="gray"
          className="text-sm  inline-block underline underline-offset-4"
        >
          Set Custom Page Size
        </p>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Page Size</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Set a custom page size.
        </Dialog.Description>

        <Text as="div" size="2" mb="1" weight="bold">
          Size
        </Text>
        <TextField.Root
          defaultValue="10"
          placeholder="Enter size"
          onChange={(size) => {
            value = parseInt(size.target.value);
          }}
        />

        <Flex justify="between" align="baseline">
          <Text size="1">
            Psst... There are {totalNumOfIssue} issues in total
          </Text>
          <Flex gap="3" mt="4">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  if (value) {
                    const params = new URLSearchParams();
                    params.append("pageSize", value.toString());
                    if (searchParams.get("status"))
                      params.append("status", searchParams.get("status")!);
                    if (searchParams.get("orderBy"))
                      params.append("orderBy", searchParams.get("orderBy")!);
                    if (searchParams.get("method"))
                      params.append("method", searchParams.get("method")!);

                    const query =
                      params.size > 0 ? "?" + params.toString() : "";
                    router.push("issues/" + query);
                    router.refresh();
                  }
                }}
              >
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomPageSize;
