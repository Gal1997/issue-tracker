"use client";
import { ErrorMessage, Spinner } from "@/app/components/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import SimpleMDE from 'react-simplemde-editor';

import { Issue } from "@prisma/client";
import { z } from "zod";
import schema from "../../validationSchema";

type IssueFormData = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);
      if (!issue) var result = await axios.post("/api/issues", data); // New issue
      else var result = await axios.patch(`/api/issues/${issue.id}`, data); // Update issue
      console.log(result.status);

      if (result.status == 200 || result.status == 201) {
        router.push("/issues");
        router.refresh();
      }
    } catch (error) {
      setisSubmitting(false);
      setError(`An unexpected error occurred`);
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
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
        defaultValue={issue?.title}
        {...register("title")}
      ></TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description…" {...field} />
        )}
      />

      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isSubmitting}>
        {issue ? "Update Issue" : "Submit New Issue"}{' '}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
