import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReports } from "../redux/ReportsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.reports);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/reports");
        const reportsData = response.data
          ? Object.entries(response.data).map(([id, data]) => ({
              id,
              ...data,
            }))
          : [];
        dispatch(setReports(reportsData));
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-100 to-indigo-200">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          Aduan Masyarakat
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image Section */}
              {report.image && (
                <img
                  src={"http://localhost:3000" + report.image}
                  alt={report.title}
                  className="w-full h-56 object-cover rounded-t-3xl"
                />
              )}

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-indigo-900 mb-3 truncate">
                  {report.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 text-sm mb-6">{report.description}</p>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Lokasi:</strong> {report.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Ketinggian Air:</strong> {report.height} m
                  </p>
                </div>

                <p className="text-xs text-blue-600 font-semibold">
                  Dikirim oleh: {report.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
