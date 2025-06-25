import { IBaseEntity } from "@/types/shared";

export const getBaseEntity = (): IBaseEntity => {
  return { _id: (Math.random() * 9999).toString(), created_at: Date.now() };
};
