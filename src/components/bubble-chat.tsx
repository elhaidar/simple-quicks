"use client";

import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Message } from "@/schemas/chat";
import { USER_ID } from "@/lib/constant";
import { useInbox } from "@/context/InboxContext";
import { motion } from "framer-motion";
import { useState } from "react";

interface BubbleChatProps {
  variant?: "left" | "right";
  color?: string;
  message: Message;
  chatId: string;
  repliedContent?: string;
}

export function BubbleChat({
  variant = "left",
  color,
  message,
  chatId,
  repliedContent,
}: BubbleChatProps) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  });

  const { deleteMessage, setEditMessage, setReplyMessage } = useInbox();

  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(`/api/chat/${chatId}/${message.messageId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete message");
      deleteMessage(chatId, message.messageId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <motion.div
      className={cn("flex flex-col gap-2", variant === "right" && "items-end")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
    >
      <p
        className={cn(
          "text-sm font-bold text-chats-1-foreground",
          variant === "right" && "text-right text-chats-3-foreground",
          color === "chats-1" && "text-chats-2-foreground",
          color === "chats-2" && "text-chats-1-foreground",
          color === "chats-4" && "text-chats-4-foreground"
        )}
      >
        {variant === "right" ? "You" : message.senderName}
      </p>
      {message.repliedToMessageId && (
        <div
          className={cn(
            "bg-secondary-2 p-[10px] rounded-lg border border-secondary max-w-[518px] min-w-[100px] w-fit"
          )}
        >
          <p className="text-sm max-w-[500px]">{repliedContent || ""}</p>
        </div>
      )}
      <div
        className={cn("flex gap-2", variant === "right" && "flex-row-reverse")}
      >
        <div
          className={cn(
            "p-[10px] bg-chats-1 rounded-md max-w-[518px] min-w-[100px]",
            variant === "right" && "bg-chats-3",
            color === "chats-1" && "bg-chats-2",
            color === "chats-2" && "bg-chats-1",
            color === "chats-4" && "bg-chats-4"
          )}
        >
          <p className="text-sm mb-1">{message.content}</p>
          <div className="flex justify-between items-center gap-4">
            <time className="text-xs">{time}</time>
            {message.isEdited && <p className="text-xs">Edited</p>}
          </div>
        </div>
        <Popover open={isOpen}>
          <PopoverTrigger
            asChild
            className={cn(
              "sticky",
              variant === "left"
                ? "left-[50%] right-auto"
                : "right-[50%] left-auto"
            )}
          >
            <Button
              variant="icon"
              size="icon16"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[126px] p-0 border-border-secondary">
            <div className="flex flex-col items-start rounded-none">
              {message.senderId === USER_ID ? (
                <Button
                  className={cn(
                    "text-base text-primary w-full flex justify-start border-b-[1px] border-border-secondary",
                    variant === "left" && "hidden"
                  )}
                  variant="ghost-secondary"
                  size="sm"
                  onClick={() => {
                    setEditMessage(message);
                    setIsOpen(false);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className={cn(
                    "text-base text-primary w-full flex justify-start border-b-[1px] border-border-secondary"
                  )}
                  variant="ghost-secondary"
                  size="sm"
                  onClick={() => {
                    setReplyMessage(message);
                    setIsOpen(false);
                  }}
                >
                  Reply
                </Button>
              )}
              <Button
                className="text-base text-destructive w-full flex justify-start"
                variant="ghost-secondary"
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
}
