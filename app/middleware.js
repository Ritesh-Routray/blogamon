import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a secure secret

export function middleware(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Add user information to the request (optional)
    req.user = decodedToken;

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

// Protect only specific routes (e.g., /api/protected)
export const config = {
  matcher: ["/api/protected/:path*"], // Change this to match the routes you want to protect
};
