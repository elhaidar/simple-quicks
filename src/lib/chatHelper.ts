import { Chat, Message, Participant } from "@/schemas/chat";

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

export function getLatestTimestamp(chat: Chat): string {
  const latestMessage = chat?.messages?.reduce((latest, message) => {
    return new Date(message.timestamp) > new Date(latest.timestamp)
      ? message
      : latest;
  }, chat.messages[0]);

  return latestMessage?.timestamp;
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

export function getBubbleColor(
  senderId: string,
  userId: string,
  participants: Participant[]
) {
  if (senderId === userId) {
    return "chats-3";
  }

  const otherParticipants = participants.filter(
    (participant) => participant.userId !== userId
  );

  const otherIndex = otherParticipants.findIndex(
    (participant) => participant.userId === senderId
  );
  return `chats-${(otherIndex % 2) + 1}`;
}
