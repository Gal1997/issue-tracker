"use client";
import React, { useState } from "react";
import {
  Text,
  TextArea,
  Flex,
  Button,
  Callout,
  AlertDialog,
  Spinner,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";

const AddComment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);

      alert(data.comment);
      // if (!issue) var result = await axios.post("/api/issues", data); // New issue
      // else var result = await axios.patch(`/api/issues/${issue.id}`, data); // Update issue
      // console.log(result.status);

      // if (result.status == 200 || result.status == 201) {
      //   router.push("/issues");
      //   router.refresh();
      // }
    } catch (error) {
      setisSubmitting(false);
      setError(`An unexpected error occurred`);
    } finally {
      setisSubmitting(false);
    }
  });

  return (
    <Flex direction="column" maxWidth="500px" className="space-y-2">
      <Text className="font-medium text-xl">Add a comment</Text>
      <form className="max-w-xl space-y-3 " onSubmit={onSubmit}>
        {error && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <AiFillExclamationCircle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <TextArea
          placeholder="Write your comment here..."
          {...register("comment")}
          onChange={(e) => setMessage(e.target.value)}
        ></TextArea>

        {/* GOOGLE : If the <button> is inside a <form> , that button will be treated as the "submit" button! */}

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button disabled={message.length == 0 || isSubmitting}>
              {"Submit"}
              {isSubmitting && <Spinner />}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="220px">
            <AlertDialog.Description
              size="3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Are you sure?
            </AlertDialog.Description>

            <Flex gap="6" mt="4" justify="start">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray" style={{ width: "70px" }}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  color="green"
                  onClick={onSubmit}
                  style={{ width: "70px" }}
                >
                  Yes
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </form>
    </Flex>
  );
};

export default AddComment;
