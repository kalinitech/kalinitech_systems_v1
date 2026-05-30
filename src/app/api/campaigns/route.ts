import { NextRequest, NextResponse } from "next/server";

// In-memory campaigns storage (resets on serverless cold start)
const campaigns: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const campaign = { ...data, id: `camp-${Date.now()}`, createdAt: new Date().toISOString() };
    campaigns.push(campaign);
    return NextResponse.json(campaign, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
