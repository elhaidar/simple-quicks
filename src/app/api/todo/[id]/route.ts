import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json(
    { data: res, success: true, message: "Task updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    id: params.id,
    success: true,
    message: "Task deleted",
  });
}
