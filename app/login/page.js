"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For page redirection after successful login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // For redirection

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Ensure password is provided
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setError("");
      // Store JWT token in localStorage after successful login
      localStorage.setItem("token", data.token);

      // Redirect to dashboard or home page after successful login
      router.push("/"); // Adjust the redirect path based on your app structure
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96 max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-center">
            Login successful! Redirecting...
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </div>
      </form>
    </div>
  );
}
