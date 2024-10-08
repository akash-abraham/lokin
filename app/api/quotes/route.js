import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes/")
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
    }

    const finalresponse = await response.json()
    return NextResponse.json({ finalresponse })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred",error }, { status: 500 })
  }
}
