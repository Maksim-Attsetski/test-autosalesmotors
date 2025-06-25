export type TTodoStatus = "COMPLETED" | "IN_PROGRESS" | "CANCELLED";

export interface ITodoCreateDto {
  title: string;
  description: string;
  location: string;
  due_at: number;
  attachments: string[];
}
export interface ITodo extends ITodoCreateDto {
  _id: string;
  created_at: number;
  status: TTodoStatus;
}
