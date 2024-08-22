import { forwardRef } from "react";
import { Chat } from "@/schemas/chat";
import { BubbleChat } from "./bubble-chat";
import { ChatDayDivider } from "./chat-day-divider";
import { USER_ID } from "@/lib/constant";
import { getBubbleColor } from "@/lib/chatHelper";
import { AnimatePresence, motion } from "framer-motion";

interface ChatRoomContentProps {
  chat?: Chat;
  chatEndRef: React.RefObject<HTMLDivElement>;
  onViewportEnter?: () => void;
}

export function ChatRoomContent({
  chat,
  chatEndRef,
  onViewportEnter,
}: ChatRoomContentProps) {
  const setOfUniqueDates = new Set<string>(
    chat?.messages.map((message) => message.timestamp.split("T")[0]) || []
  );

  return (
    <div className="pb-4">
      {Array.from(setOfUniqueDates).map((date, index) => (
        <div key={index} className="space-y-4">
          <ChatDayDivider key={date} date={date} />
          <AnimatePresence>
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
                        )?.content || "Deleted Message"
                      : undefined
                  }
                  chatId={chat.chatId}
                />
              ))}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={chatEndRef}
            onViewportEnter={onViewportEnter}
          />
        </div>
      ))}
    </div>
  );
}
