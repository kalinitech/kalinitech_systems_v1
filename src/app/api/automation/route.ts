import { NextRequest, NextResponse } from "next/server";

// In-memory automation logs (resets on serverless cold start)
const automationLogs: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json(automationLogs.slice(-50));
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const log = { ...data, id: `log-${Date.now()}`, createdAt: new Date().toISOString() };
    automationLogs.push(log);
    return NextResponse.json(log, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
  }
}
