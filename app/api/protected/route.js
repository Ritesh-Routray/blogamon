import { NextResponse } from "next/server";

export async function GET(req) {
  // Access the user object from the middleware (optional)
  const user = req.user;

  return NextResponse.json({
    message: "You have accessed a protected route!",
    user,
  });
}
