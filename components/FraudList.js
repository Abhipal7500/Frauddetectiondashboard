import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FraudList({ apps, urls }) {
  const [selectedFraud, setSelectedFraud] = useState(null);

  const openModal = (fraud) => setSelectedFraud(fraud);
  const closeModal = () => setSelectedFraud(null);

  const RiskBadge = ({ level }) => {
    const colors = {
      High: "bg-red-500",
      Medium: "bg-yellow-500",
      Low: "bg-green-500",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${colors[level]}`}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🚨 Recent Fraud Detections</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-md">
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Name / URL</th>
              <th className="py-3 px-4 text-left">Risk Level</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {[...apps.map((app) => ({ ...app, type: "App" })), ...urls.map((url) => ({ ...url, type: "URL" }))].map(
              (item, index) => (
                <motion.tr
                  key={index}
                  className="bg-white shadow-sm rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-3 px-4 font-medium">{item.type}</td>
                  <td className="py-3 px-4 font-semibold">
                    {item.type === "App" ? item.app_name : item.url}
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge level={item.risk_level} />
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-100 transition"
                    >
                      Details
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition">
                      Block
                    </button>
                  </td>
                </motion.tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedFraud && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-bold text-gray-800">Fraud Detection Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-red-500 text-lg font-bold"
                >
                  ✖
                </button>
              </div>
              <p className="text-gray-600 mt-2">Detailed information about the detected fraud:</p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="font-semibold text-gray-700">Description</p>
                  <p className="text-gray-600">{selectedFraud.description || "No description available."}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Developer</p>
                  <p className="text-gray-600">{selectedFraud.developer || "Unknown Dev"}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Category</p>
                  <p className="text-gray-600">{selectedFraud.category || "Unknown"}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
