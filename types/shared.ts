export type TAction = "POST" | "UPDATE" | "DELETE";

export interface IBaseEntity {
  created_at: number;
  _id: string;
}

export interface ILog extends IBaseEntity {
  action: TAction;
}
