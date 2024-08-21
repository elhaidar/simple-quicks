import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string; messageId: string } }
) {
  return NextResponse.json({
    data: { chatId: params.chatId, messageId: params.messageId },
    message: "Message deleted",
    success: true,
  });
}

export async function PATCH(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json({
    data: res,
    success: true,
    message: "Message updated successfully",
  });
}
