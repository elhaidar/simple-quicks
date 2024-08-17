import { BubbleChat } from "./bubble-chat";
import { ChatDayDivider } from "./chat-day-divider";

export function ChatRoomContent() {
  return (
    <div className="space-y-4">
      <BubbleChat />
      <ChatDayDivider />
      <BubbleChat />
      <BubbleChat variant="right" />
      <BubbleChat color="chats-1" />
      <BubbleChat />
      <BubbleChat />
      <BubbleChat />
      <BubbleChat />
    </div>
  );
}
