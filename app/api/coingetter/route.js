import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('id'); // Get email from query params

  try {
    // Find user based on email and select points
    const user = await client.user.findUnique({
      where: { email: email },
      select: { points: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user's points
    return NextResponse.json({ points: user.points });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
