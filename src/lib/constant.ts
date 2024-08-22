import { TodoCategory } from "@/schemas/todo";

export const USER_ID = "user_1";

export const TODO_CATEGORY_COLOR: Record<TodoCategory, string> = {
  [TodoCategory.ImportantASAP]: "bg-stickers-1",
  [TodoCategory.OfflineMeeting]: "bg-stickers-2",
  [TodoCategory.VirtualMeeting]: "bg-stickers-3",
  [TodoCategory.ASAP]: "bg-stickers-4",
  [TodoCategory.ClientRelated]: "bg-stickers-5",
  [TodoCategory.SelfTask]: "bg-stickers-6",
  [TodoCategory.Appointments]: "bg-stickers-7",
  [TodoCategory.CourtRelated]: "bg-stickers-8",
};
