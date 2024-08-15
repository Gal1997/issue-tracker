import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "Title is too short").max(255),
  description: z.string().min(3).max(65535),
});

const patchIssueSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255).optional(),
  description: z.string().min(3).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export default schema;
export { patchIssueSchema };
