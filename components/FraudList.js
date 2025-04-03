import { useState } from "react";

export default function FraudList({ apps, urls }) {
  const [selectedFraud, setSelectedFraud] = useState(null);

  const openModal = (fraud) => {
    setSelectedFraud(fraud);
  };

  const closeModal = () => {
    setSelectedFraud(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Fraud Detections</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Name / URL</th>
              <th className="py-3 px-4 text-left">Risk Level</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {apps.map((app, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">App</td>
                <td className="py-3 px-4 font-medium">{app.app_name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      app.risk_level === "High"
                        ? "bg-red-500"
                        : app.risk_level === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {app.risk_level}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openModal(app)}
                    className="border border-gray-400 text-gray-700 px-3 py-1 rounded-md text-xs cursor-pointer hover:bg-gray-200"
                  >
                    Details
                  </button>
                  <button className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs cursor-pointer hover:bg-red-600">
                    Block
                  </button>
                </td>
              </tr>
            ))}
            {urls.map((url, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">URL</td>
                <td className="py-3 px-4 font-medium">{url.url}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      url.risk_level === "High"
                        ? "bg-red-500"
                        : url.risk_level === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {url.risk_level}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openModal(url)}
                    className="border border-gray-400 text-gray-700 px-3 py-1 rounded-md text-xs cursor-pointer hover:bg-gray-200"
                  >
                    Details
                  </button>
                  <button className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs cursor-pointer hover:bg-red-600">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFraud && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Fraud Detection Details</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 text-lg">
                ✖
              </button>
            </div>
            <p className="text-gray-600 mt-2">Detailed information about the detected fraud</p>
            <div className="mt-4">
              <p className="font-bold">Description</p>
              <p className="text-gray-700">{selectedFraud.description || "No description available."}</p>
            </div>
            <div className="mt-4">
              <p className="font-bold">Developer</p>
              <p className="text-gray-700">{selectedFraud.developer || "Unknown Dev"}</p>
            </div>
            <div className="mt-4">
              <p className="font-bold">Category</p>
              <p className="text-gray-700">{selectedFraud.category || "Unknown"}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
