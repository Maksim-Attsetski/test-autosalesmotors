import { ITodo, ITodoCreateDto } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getBaseEntity } from "@/lib/utils";
import { ILog } from "@/types/shared";

interface IState {
  todos: ITodo[];
  addTodo: (t: ITodoCreateDto) => void;
  editTodo: (t: Partial<ITodo>) => void;
  deleteTodo: (id: string) => void;

  logs: ILog[];
  setLogs: (v: ILog[]) => void;
  deleteLog: (id: ILog["_id"]) => void;
}

export const useTodos = create<IState>()(
  persist(
    (set) => ({
      logs: [],
      setLogs: (logs) => set((s) => ({ ...s, logs })),
      deleteLog: (id) => set((s) => ({ ...s, logs: s.logs.filter((l) => l._id !== id) })),
      todos: [
        {
          _id: "test_id",
          created_at: Date.now(),
          title: "Test title",
          description: "Test description",
          status: "COMPLETED",
          location: "Minsk",
          due_at: Date.now(),
          attachments: [],
        },
      ],
      addTodo: (newTodo) =>
        set((s) => ({
          ...s,
          todos: [...s.todos, { ...newTodo, ...getBaseEntity(), status: "IN_PROGRESS" }],
          logs: [...s.logs, { ...getBaseEntity(), action: "POST" }],
        })),
      deleteTodo: (id) =>
        set((s) => ({
          ...s,
          todos: s.todos.filter((item) => item._id !== id),
          logs: [...s.logs, { ...getBaseEntity(), action: "DELETE" }],
        })),
      editTodo: (newTodo) =>
        set((s) => ({
          ...s,
          todos: s.todos.map((item) => (item._id === newTodo._id ? { ...item, ...newTodo } : item)),
          logs: [...s.logs, { ...getBaseEntity(), action: "UPDATE" }],
        })),
    }),
    {
      name: "todos-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
