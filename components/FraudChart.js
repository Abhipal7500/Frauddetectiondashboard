import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function FraudChart({ trends }) {
  // Format date to DD-MM-YY
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  };

  const chartData = {
    labels: trends.map((t) => formatDate(t.date)),
    datasets: [
      {
        label: "Total Cases",
        data: trends.map((t) => t.fraud_cases_detected),
        borderColor: "#E74C3C",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#E74C3C",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 14 },
          usePointStyle: true,
          padding: 20,
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
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#666",
          font: { size: 12 },
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
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
    <motion.div
      className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          📈 Fraud Cases Trend (Last 30 Days)
        </h2>
        <span className="text-sm text-gray-500 italic">Live Monitoring</span>
      </div>
      <div className="h-[32rem]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
}
