import { Chat } from "@/schemas/chat";
import { BubbleChat } from "./bubble-chat";
import { ChatDayDivider } from "./chat-day-divider";
import { USER_ID } from "@/lib/constant";
import { getBubbleColor } from "@/lib/chatHelper";

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
        <div key={date} className="space-y-4 ">
          <ChatDayDivider date={date} />
          {chat?.messages
            .filter((message) => message.timestamp.split("T")[0] === date)
            .map((message, index) => (
              <BubbleChat
                key={message.messageId}
                color={getBubbleColor(
                  message.senderId,
                  USER_ID,
                  chat.participants
                )}
                variant={message.senderId === USER_ID ? "right" : "left"}
                message={message}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
