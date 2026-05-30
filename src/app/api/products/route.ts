import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(allProducts);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ ...data, id: `prod-${Date.now()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
