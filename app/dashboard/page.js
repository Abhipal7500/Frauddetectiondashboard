"use client";
import { useEffect, useState } from "react";
import FraudList from "@/components/FraudList";
import FraudChart from "@/components/FraudChart";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/fraud-data");
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, []);

  const handleLogout = async() => {
   
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    console.log("User logged out");
    window.location.href = "/login";
  };

  if (!data)
    return <p className="text-center text-lg text-gray-700">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Fraud Detection Dashboard
        </h1>
       
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

     
      <div className="mb-6">
        <FraudChart trends={data.fraud_trends_30_days} />
      </div>

      <div>
        <FraudList apps={data.fraudulent_apps} urls={data.fraudulent_urls} />
      </div>
    </div>
  );
}