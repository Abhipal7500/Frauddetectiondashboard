"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Fraud Detection Dashboard, By Abhishek PalS</h1>
      <p className="text-gray-700 mb-6">Monitor and analyze fraudulent activities in real time, Done some chnages in main from github.</p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => router.push("/login")}
      >
        Get Started
      </button>
    </div>
  );
}
