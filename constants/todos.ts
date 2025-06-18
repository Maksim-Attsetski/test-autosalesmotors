import { TTodoStatus } from "@/types";

export const todoStatuses: Record<TTodoStatus, string> = {
  CANCELLED: "Cancelled ❌",
  COMPLETED: "Done ✅",
  IN_PROGRESS: "In progress 🚀",
};
