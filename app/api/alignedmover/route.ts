import { NextResponse } from "next/server";
import { defaultAlignedMover, type AlignedMover } from "@/lib/types/alignedmover";
import alignedMoverData from "@/data/alignedmover.json";

export async function GET() {
  const data: AlignedMover = {
    ...alignedMoverData.alignedmover,
    createdAt: alignedMoverData.alignedmover.createdAt,
    updatedAt: new Date().toISOString(),
  } as AlignedMover;

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const updatedData: AlignedMover = {
      ...defaultAlignedMover,
      ...body,
      id: body.id || defaultAlignedMover.id,
      slug: "alignedmover",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedData, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
