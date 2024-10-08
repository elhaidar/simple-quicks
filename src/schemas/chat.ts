export interface Chat {
  chatId: string;
  type: string;
  participants: Participant[];
  messages: Message[];
  groupName?: string;
  groupAvatarUrl?: string;
}

export interface Message {
  messageId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isEdited: boolean;
  repliedToMessageId?: string;
}

export interface Participant {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role?: string;
}
