"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { ArrowDown, ArrowLeft, Loader2, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useInbox } from "@/context/InboxContext";
import { ChatRoomContent } from "./chat-room-content";
import { useMenu } from "@/context/MenuContext";
import { Input } from "./ui/input";
import { Chat, Participant } from "@/schemas/chat";
import { USER_ID } from "@/lib/constant";
import { useEffect, useMemo, useRef, useState } from "react";
import { findUndreadMessage } from "@/lib/chatHelper";
import { PreviewMessageBox } from "./preview-message-box";
interface ChatRoomProps extends MotionProps {}

export function ChatRoom({ ...props }: ChatRoomProps) {
  const [chat, setChat] = useState<Chat | undefined>(undefined);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    selectedRoom,
    setSelectedRoom,
    chats,
    setChats,
    editMessage,
    setEditMessage,
    addMessage,
    updateMessage,
  } = useInbox();
  const { setMenu } = useMenu();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (!chat?.chatId) return;
      setIsSubmitting(true);
      e.preventDefault();
      if (!message) return;
      const payload = {
        message,
      };
      const res = await fetch(`/api/chat/${chat?.chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setMessage("");
      addMessage(chat.chatId, message);
      scrollToBottom();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (!chat?.chatId || !editMessage?.messageId) return;
      setIsSubmitting(true);
      e.preventDefault();
      if (!message) return;
      const payload = {
        message,
      };
      const res = await fetch(`/api/chat/${chat?.chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setMessage("");
      updateMessage(chat.chatId, editMessage.messageId, message);
      setEditMessage(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const anyUnreadMessages = useMemo(() => {
    return findUndreadMessage(chat?.messages || []);
  }, [chat]);

  useEffect(() => {
    if (chat) {
      scrollToBottom();
    }
  }, [chat]);

  useEffect(() => {
    if (selectedRoom) {
      const selectedChat = chats.find((chat) => chat.chatId === selectedRoom);
      setChat(selectedChat);
    }
  }, [selectedRoom, chats]);

  useEffect(() => {
    setMessage(editMessage?.content || "");
  }, [editMessage]);

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] absolute bottom-[110px] rounded-[6px] origin-bottom-right"
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
      <div className="flex flex-col px-6 pt-2 pb-8 w-full max-h-[80%] overflow-y-auto">
        <ChatRoomContent chat={chat} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          ref={chatEndRef}
          onViewportEnter={newMessageOnViewportEnter}
        />
      </div>
      <div className={cn("absolute bottom-0 w-full")}>
        {anyUnreadMessages && (
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
        <div className="bg-white py-5 px-6">
          <form
            className="flex items-center gap-2 w-full"
            onSubmit={editMessage ? handleUpdate : handleSubmit}
          >
            <div className="w-full relative">
              {editMessage && <PreviewMessageBox message={editMessage} />}
              <Input
                type="text"
                placeholder="Type a new message"
                className="text-sm py-5 font-bold bg-white z-10 relative"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="px-5 z-10" disabled={isSubmitting}>
              <Loader2
                className={cn(
                  "w-4 h-4 animate-spin mr-2 hidden",
                  isSubmitting && "inline-flex"
                )}
              />
              Send
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
