import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json({ ...res, success: true }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json({ ...res, success: true }, { status: 200 });
}
