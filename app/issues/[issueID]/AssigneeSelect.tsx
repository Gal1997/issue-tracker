"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();
  const router = useRouter();

  if (isLoading) return <Skeleton height={30} />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch(
        "https://issue-tracker-gal-israelis-projects.vercel.app//api/issues/" +
          issue.id,
        {
          assignedToUserId: userId !== "null" ? userId : null,
        }
      )
      .then(() => {
        toast.success("Changes saved", { position: "top-center" });
        router.refresh();
      })
      .catch(() => {
        toast.error("Changes could not be saved", {
          position: "top-center",
        });
        router.refresh();
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"} // 'null' pulls up the item which value is 'null' , line 46
        onValueChange={assignIssue}
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

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 0,
    retry: 3,
  });

export default AssigneeSelect;
