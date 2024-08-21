"use client";

import { Todo } from "@/schemas/todo";
import { createContext, ReactNode, useContext, useState } from "react";

interface TaskContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleOnChangeCompleted(id: string): void;
  handleOnChangeDescription(id: string, description: string): void;
  handleOnChangeDate(id: string, date: string): void;
  handleOnChangeTitle(id: string, title: string): void;
  addTask(todo: Todo): void;
  deleteTask(id: string): void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleOnChangeCompleted(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleOnChangeDescription(id: string, description: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, description } : todo))
    );
  }

  function handleOnChangeDate(id: string, date: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, date } : todo))
    );
  }

  function handleOnChangeTitle(id: string, title: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  }

  function addTask(todo: Todo) {
    setTodos((prev) => [...prev, todo]);
  }

  function deleteTask(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <TaskContext.Provider
      value={{
        todos,
        setTodos,
        handleOnChangeCompleted,
        handleOnChangeDate,
        handleOnChangeDescription,
        handleOnChangeTitle,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
