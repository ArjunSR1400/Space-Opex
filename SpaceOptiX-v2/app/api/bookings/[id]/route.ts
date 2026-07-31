import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import * as bookingController from "@/lib/controllers/booking.controller";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    return await bookingController.updateBooking({
      user: { userId: user.userId, role: user.role },
      bookingId: id,
      body,
    });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
