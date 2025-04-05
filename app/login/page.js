"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-base text-center mb-6">{error}</p>
        )}

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 text-lg font-medium">
            Email
          </label>
          <input
            className="w-full px-6 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-gray-700 text-lg font-medium">
            Password
          </label>
          <input
            className="w-full px-6 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition duration-300"
          type="submit"
        >
          Login
        </button>

        <p className="text-base text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-indigo-600 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
