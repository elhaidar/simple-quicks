"use client";

import { useMenu } from "@/context/MenuContext";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Inbox } from "./inbox";
import { Task } from "./task";
import { ChatRoom } from "./chat-room";
import { useInbox } from "@/context/InboxContext";
import { Chat } from "@/schemas/chat";
import { Todo } from "@/schemas/todo";
import { useTask } from "@/context/TaskContext";

interface ContainerProps {
  chats: Chat[];
  todos: Todo[];
}

export function Container({ chats, todos }: ContainerProps) {
  const { menu } = useMenu();
  const { setChats, selectedRoom, setSelectedRoom } = useInbox();
  const { setTodos } = useTask();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setChats(chats);
  }, [chats, setChats]);

  useEffect(() => {
    setTodos(todos);
  }, [todos, setTodos]);

  useEffect(() => {
    if (menu) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setIsLoading(true);
    }

    return () => {
      setSelectedRoom(null);
    };
  }, [menu, setSelectedRoom]);

  return (
    <AnimatePresence>
      {menu && menu === "inbox" ? (
        selectedRoom ? (
          <ChatRoom />
        ) : (
          <Inbox key={menu} isLoading={isLoading} />
        )
      ) : menu === "task" ? (
        <Task isLoading={isLoading} key={menu} />
      ) : null}
    </AnimatePresence>
  );
}
