import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addReport, setLoading, setError } from "../redux/ReportsSlice";
import Swal from "sweetalert2";

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    height: "",
    weather: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = user.uid;
    const author = user.name;
    const formDataToSend = new FormData();

    formDataToSend.append("image", formData.image);

    const newReport = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      height: formData.height,
      weather: formData.weather,
      uid,
      author,
    };

    formDataToSend.append("reportData", JSON.stringify(newReport));

    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reports",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      dispatch(addReport({ id: response.data.id, ...newReport }));

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Laporan berhasil dibuat.",
      });
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error creating report", error);
      Swal.fire({
        icon: "error",
        title: error.message,
        text: "Terjadi kesalahan saat membuat laporan.",
      });
    } finally {
      dispatch(setLoading(false));
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

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-3xl font-semibold text-center text-indigo-800 mb-8">
            Buat Aduan
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  accept="image/*"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ketinggian Air (meter)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-900 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Sedang Mengirim..." : "Mengirim Aduan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
