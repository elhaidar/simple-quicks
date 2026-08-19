import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      chatId: string;
      messageId: string;
    }>;
  },
) {
  const { chatId, messageId } = await params;

  return NextResponse.json({
    data: { chatId, messageId },
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
