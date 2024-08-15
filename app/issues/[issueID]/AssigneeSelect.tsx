"use client";
import { Issue, User } from "@prisma/client";
import { Select, Separator } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 0,
    retry: 3,
  });

  if (isLoading) return <Skeleton height={30} />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"} // 'null' pulls up the item which value is 'null' , line 46
        onValueChange={(userId) => {
          axios
            .patch("http://localhost:3000/api/issues/" + issue.id, {
              assignedToUserId: userId !== "null" ? userId : null,
            })
            .then(() => {
              toast.success("Changes saved");
            })
            .catch(() => {
              toast.error("Changes could not be saved", {
                position: "top-center",
              });
            });
        }}
      >
        <Select.Trigger placeholder="Assign..." style={{ width: "100%" }} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.email}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Item value="null">Unassigned</Select.Item>{" "}
          {/* This is line 46 */}
        </Select.Content>
      </Select.Root>
      <Toaster position="bottom-right" />
    </>
  );
};

export default AssigneeSelect;
