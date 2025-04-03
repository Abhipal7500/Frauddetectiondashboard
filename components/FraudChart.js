import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function FraudChart({ trends }) {
  const chartData = {
    labels: trends.map((t) => t.date),
    datasets: [
      {
        label: "Total Cases",
        data: trends.map((t) => t.fraud_cases_detected),
        borderColor: "#E74C3C", // Red color for the line
        backgroundColor: "rgba(231, 76, 60, 0.2)", // Light red fill
        borderWidth: 2,
        pointBackgroundColor: "#E74C3C",
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // Smooth curve
        fill: true, // Fill area below the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 14 },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Total Cases: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#E74C3C",
        borderColor: "#E74C3C",
        borderWidth: 1,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "#666", font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#666", font: { size: 12 } },
        grid: { color: "rgba(200, 200, 200, 0.3)" },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Fraud Cases Trend (30d)</h2>
      <div className="h-72">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
