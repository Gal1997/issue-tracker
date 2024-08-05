"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { z } from "zod";
import schema from "../../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueForm = z.infer<typeof schema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.post("/api/issues", data);
          if (result.status == 201) router.push("/issues");
        } catch (error) {
          setError("An unexpected error occurred");
        }
      })}
    >
      {error && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <AiFillExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      {errors.title && (
        <Text color="red" as="p">
          {errors.title.message}
        </Text>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description…" {...field} />
        )}
      />
      {errors.description && (
        <Text color="red" as="p">
          {errors.description.message}
        </Text>
      )}

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
