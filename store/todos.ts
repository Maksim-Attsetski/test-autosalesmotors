import { ITodo, ITodoCreateDto } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IState {
  todos: ITodo[];
  addTodo: (t: ITodoCreateDto) => void;
  editTodo: (t: Partial<ITodo>) => void;
  deleteTodo: (id: string) => void;
}

export const useTodos = create<IState>()(
  persist(
    (set, get) => ({
      todos: [
        {
          _id: "test_id",
          created_at: Date.now(),
          title: "Test title",
          description: "Test description",
          status: "COMPLETED",
          location: "Minsk",
        },
      ],
      addTodo: (newTodo) =>
        set((s) => ({
          ...s,
          todos: [
            ...s.todos,
            { ...newTodo, _id: (Math.random() * 9999).toString(), created_at: Date.now(), status: "IN_PROGRESS" },
          ],
        })),
      deleteTodo: (id) => set((s) => ({ ...s, todos: s.todos.filter((item) => item._id !== id) })),
      editTodo: (newTodo) =>
        set((s) => ({
          ...s,
          todos: s.todos.map((item) => (item._id === newTodo._id ? { ...item, ...newTodo } : item)),
        })),
    }),
    {
      name: "todos-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
