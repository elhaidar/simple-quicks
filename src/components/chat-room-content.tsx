import { forwardRef } from "react";
import { Chat } from "@/schemas/chat";
import { BubbleChat } from "./bubble-chat";
import { ChatDayDivider } from "./chat-day-divider";
import { USER_ID } from "@/lib/constant";
import { getBubbleColor } from "@/lib/chatHelper";
import { AnimatePresence, motion } from "framer-motion";

interface ChatRoomContentProps {
  chat?: Chat;
}

export function ChatRoomContent({ chat }: ChatRoomContentProps) {
  const setOfUniqueDates = new Set<string>(
    chat?.messages.map((message) => message.timestamp.split("T")[0]) || []
  );

  return (
    <div className="pb-4">
      {Array.from(setOfUniqueDates).map((date) => (
        <div key={date} className="space-y-4">
          <AnimatePresence>
            <ChatDayDivider date={date} />
            {chat?.messages
              .filter((message) => message.timestamp.split("T")[0] === date)
              .map((message) => (
                <BubbleChat
                  key={message.messageId}
                  color={
                    chat.type === "group"
                      ? getBubbleColor(
                          message.senderId,
                          USER_ID,
                          chat.participants
                        )
                      : message.senderId === USER_ID
                      ? undefined
                      : "chats-4"
                  }
                  variant={message.senderId === USER_ID ? "right" : "left"}
                  message={message}
                  repliedContent={
                    message.repliedToMessageId
                      ? chat.messages.find(
                          (m) => m.messageId === message.repliedToMessageId
                        )?.content
                      : undefined
                  }
                  chatId={chat.chatId}
                />
              ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
