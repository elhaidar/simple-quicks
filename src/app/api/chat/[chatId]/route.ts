import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json(res, { status: 201 });
}
