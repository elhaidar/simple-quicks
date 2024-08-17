"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { ArrowDown, ArrowLeft, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useInbox } from "@/context/InboxContext";
import { ChatRoomContent } from "./chat-room-content";
import { useMenu } from "@/context/MenuContext";
import { Input } from "./ui/input";
import { Chat, Participant } from "@/schemas/chat";
import { USER_ID } from "@/lib/constant";
import { useEffect, useMemo, useRef, useState } from "react";
import { findUndreadMessage } from "@/lib/chatHelper";

interface ChatRoomProps extends MotionProps {}

export function ChatRoom({ ...props }: ChatRoomProps) {
  const { selectedRoom, setSelectedRoom, chats, setChats } = useInbox();
  const { setMenu } = useMenu();

  const [chat, setChat] = useState<Chat | undefined>(undefined);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  let buddyChat: Participant | undefined;

  if (chat?.type === "personal") {
    buddyChat = chat.participants.find(
      (participant) => participant.userId !== USER_ID
    );
  }

  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function newMessageOnViewportEnter() {
    setIsScrolledToBottom(true);
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === selectedRoom) {
        return {
          ...chat,
          messages: chat.messages.map((message) => ({
            ...message,
            isRead: true,
          })),
        };
      }
      return chat;
    });

    setChats(updatedChats);
  }

  const anyUnreadMessages = useMemo(() => {
    return findUndreadMessage(chat?.messages || []);
  }, [chat]);

  useEffect(() => {
    if (selectedRoom) {
      const selectedChat = chats.find((chat) => chat.chatId === selectedRoom);
      setChat(selectedChat);
    }
  }, [selectedRoom, chats]);

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] origin-bottom-right"
      )}
    >
      <div className="flex gap-4 items-center px-6 bg-white z-[10] sticky top-0 py-5 border-b-[2px] border-secondary">
        <Button
          variant={"icon"}
          size={"icon24"}
          onClick={() => setSelectedRoom(null)}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-col gap-1 h-[44px] justify-center">
          <h3 className="font-bold text-primary">
            {chat?.groupName || buddyChat?.displayName || "-"}
          </h3>
          {chat?.type === "group" && (
            <p className="text-xs font-bold">{`${
              chat?.participants?.length || 0
            } Participants`}</p>
          )}
        </div>
        <Button
          className="ml-auto"
          variant={"icon"}
          size={"icon24"}
          onClick={() => setMenu("")}
        >
          <X />
        </Button>
      </div>
      <div className="flex flex-col px-6 py-2 w-full">
        <ChatRoomContent />
        <motion.div
          ref={chatEndRef}
          onViewportEnter={newMessageOnViewportEnter}
        />
      </div>
      <div className="sticky bottom-0 w-full">
        {anyUnreadMessages && !isScrolledToBottom && (
          <div className="flex flex-col items-center mb-3">
            <Button
              className={cn(
                buttonVariants({ variant: "primary" }),
                "px-[12px] py-[8px]"
              )}
              onClick={scrollToBottom}
            >
              New Message <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2 w-full bg-white pb-5 px-6">
          <Input
            type="text"
            placeholder="Type a new message"
            className="text-sm py-5 font-bold"
          />
          <Button type="submit" className="px-5">
            Send
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
