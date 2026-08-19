"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { TaskContent } from "./task-content";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTask } from "@/context/TaskContext";
import MultipleSelector, { Option } from "./multiple-selector";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Vite", value: "vite", disable: true },
  { label: "Nuxt", value: "nuxt", disable: true },
  { label: "Vue", value: "vue, disable: true", disable: true },
  { label: "Remix", value: "remix" },
  { label: "Svelte", value: "svelte", disable: true },
  { label: "Angular", value: "angular", disable: true },
  { label: "Ember", value: "ember", disable: true },
  { label: "React", value: "react" },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro", disable: true },
];

interface TaskProps extends MotionProps {}

const fetchData = async () => {
  const response = await fetch("api/todo");
  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

export function Task({ ...props }: TaskProps) {
  const { setTodos } = useTask();

  const { data, isSuccess, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (isSuccess) {
      if (localStorage.getItem("todos") === null) {
        setTodos(data.data || []);
      } else {
        const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        setTodos(storedTodos);
      }
    }
  }, [data, setTodos, isSuccess]);

  return (
    <motion.div
      {...props}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh min-[1920px]:]:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] py-6 origin-bottom-right"
      )}
    >
      {isPending ? (
        <div className="flex justify-center items-center my-auto h-full">
          <Loader text={"Loading Task List..."} />
        </div>
      ) : (
        <div className="px-4 md:px-8 h-[80%] relative">
          {error ? (
            <p className="text-center">{error.message}</p>
          ) : (
            <TaskContent />
          )}
        </div>
      )}
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </motion.div>
  );
}
