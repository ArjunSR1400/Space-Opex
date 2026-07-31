import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import * as dashboardController from "@/lib/controllers/dashboard.controller";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return await dashboardController.getStats(user);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
