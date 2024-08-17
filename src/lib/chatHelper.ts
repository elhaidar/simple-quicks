import { Chat, Message, Participant } from "@/schemas/chat";
import { formatInTimeZone } from "date-fns-tz";

export function findLatestMessage(messages: Message[]) {
  return messages.reduce((latest, message) => {
    return new Date(message.timestamp) > new Date(latest.timestamp)
      ? message
      : latest;
  });
}

export function findUndreadMessage(messages: Message[]) {
  return messages.some((message) => !message.isRead);
}

export function formatDate(timestamp: string) {
  return formatInTimeZone(
    new Date(timestamp),
    "Asia/Jakarta",
    "dd/MM/yyyy HH:mm"
  );
}

export function getLatestTimestamp(chat: Chat): string {
  const latestMessage = chat.messages.reduce((latest, message) => {
    return new Date(message.timestamp) > new Date(latest.timestamp)
      ? message
      : latest;
  }, chat.messages[0]);

  return latestMessage.timestamp;
}

export function sortChatsByLatestMessage(chats: Chat[]): Chat[] {
  return chats.sort(
    (a, b) =>
      new Date(getLatestTimestamp(b)).getTime() -
      new Date(getLatestTimestamp(a)).getTime()
  );
}

export function getChatCounterpart(
  chat: Chat,
  currentUserId: string
): Participant | Participant[] | undefined {
  if (chat.type === "personal") {
    return chat.participants.find(
      (participant) => participant.userId !== currentUserId
    );
  } else if (chat.type === "group") {
    return chat.participants.filter(
      (participant) => participant.userId !== currentUserId
    );
  }
  return undefined;
}
