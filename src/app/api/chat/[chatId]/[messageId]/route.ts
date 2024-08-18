import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string; messageId: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json({
    chatId: params.chatId,
    messageId: params.messageId,
    message: "Message deleted",
  });
}
