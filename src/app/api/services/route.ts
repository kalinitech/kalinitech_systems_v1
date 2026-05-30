import { NextRequest, NextResponse } from "next/server";
import { serviceCatalog } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(serviceCatalog);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ ...data, id: `svc-${Date.now()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
