import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReports, deleteReport, updateReport } from "../redux/ReportsSlice"; 
import Swal from "sweetalert2"; // SweetAlert2 for confirmation dialogs
import Modal from "react-modal"; // React Modal for update form

const UserReport = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.reports);
  const user = useSelector((state) => state.auth.user);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    height: "",
    weather: "",
  });

  const loading = useSelector((state) => state.auth.loading); 

  useEffect(() => {
    fetchReports();
  }, [dispatch]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reports/${user.uid}`
      );
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu akan menghapus aduan ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/reports/${id}`)
          .then(() => {
            dispatch(deleteReport(id));
            Swal.fire("Terhapus!", "Aduan berhasil dihapus.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", "Gagal menghapus aduan.", "error");
            console.error("Error deleting report:", error);
          });
      }
    });
  };

  const openUpdateModal = (report) => {
    setCurrentReport(report);
    setFormData({
      title: report.title,
      image: report.image,
      description: report.description,
      location: report.location,
      height: report.height,
      weather: report.weather,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "reportData",
      JSON.stringify({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        height: formData.height,
        weather: formData.weather,
      })
    );

    formDataToSend.append("image", formData.image);

    try {
      await axios.put(
        `http://localhost:3000/api/reports/${currentReport.id}`,
        formDataToSend
      );
      Swal.fire("Terupdate!", "Aduan berhasil diupdate.", "success");
      closeModal();
      fetchReports();
    } catch (error) {
      Swal.fire("Error!", "Gagal mengupdate Aduan.", "error");
      console.error("Error updating report:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-100 py-10">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center text-cyan-800 mb-8">
          {reports.length === 0 ? "Aduan tidak ditemukan" : "Aduan Saya"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              {report.image && (
                <img
                  src={"http://localhost:3000" + report.image}
                  alt={report.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-cyan-700 mb-3">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 mb-4">{report.description}</p>
                <p className="text-sm text-gray-500">Lokasi: {report.location}</p>
                <p className="text-sm text-gray-500">Ketinggian: {report.height} m</p>

                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all duration-200"
                    onClick={() => openUpdateModal(report)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                    onClick={() => handleDelete(report.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Update Aduan
          </h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gambar
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3"
                accept="image/*"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3"
                required
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ketinggian (m)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200"
              >
                {loading ? "Updating..." : "Update Report"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserReport;
