import { IBaseEntity } from "./shared";

export type TTodoStatus = "COMPLETED" | "IN_PROGRESS" | "CANCELLED";

export interface ITodoCreateDto {
  title: string;
  description: string;
  location: string;
  due_at: number;
  attachments: string[];
}
export interface ITodo extends ITodoCreateDto, IBaseEntity {
  status: TTodoStatus;
}
