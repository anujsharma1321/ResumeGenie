import React, { useState, useContext, useMemo } from "react";
import { api } from "../api"; // Assuming 'api' is your pre-configured axios instance or fetch wrapper
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authenticate/AuthContext";
// Using react-icons for a more modern look
// npm install react-icons
import { 
  FiUploadCloud, 
  FiFileText, 
  FiX, 
  FiLoader, 
  FiAlertCircle 
} from "react-icons/fi";

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const UploadResume = ({ onResult }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("id", user.id);

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/review/upload", formData);
      onResult(res.data);
      setFile(null); // Clear file on successful upload
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Error uploading resume. Please try again.";
      setError(message);
    }
    setLoading(false);
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Only PDF files are supported.");
    }
  };

  // --- Drag and Drop Handlers ---

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  // --- Memoized File Details ---
  const fileSize = useMemo(() => file ? formatFileSize(file.size) : null, [file]);

  return (
    <>
    <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    <div className="w-full max-w-lg mx-auto mt-10 p-6 sm:p-8 bg-white shadow-xl rounded-2xl border border-gray-100 transition-all duration-300">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Upload Your Resume
      </h2>

      {/* --- This section shows EITHER the dropzone OR the file preview --- */}

      {!file ? (
        <label
          htmlFor="file-upload"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
            ${isDragging 
              ? 'border-indigo-600 bg-indigo-100 ring-4 ring-indigo-200' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
            }`}
        >
          <FiUploadCloud className={`w-12 h-12 mb-3 ${isDragging ? 'text-indigo-600' : 'text-gray-400'}`} />
          <p className="text-lg font-medium text-gray-700">
            Click or drag your PDF here
          </p>
          <p className="text-sm text-gray-500">
            (Max file size: 5MB)
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
          />
        </label>
      ) : (
        // --- File Preview ---
        <div className="w-full p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiFileText className="w-6 h-6 text-indigo-700 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 break-all">{file.name}</p>
              <p className="text-xs text-gray-600">{fileSize}</p>
            </div>
          </div>
          <button
            onClick={() => setFile(null)}
            className="p-1.5 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
            aria-label="Remove file"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* --- Error Message Display --- */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2">
          <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* --- Submit Button --- */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className={`mt-6 w-full py-3 px-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2
          transition-all duration-300 shadow-md hover:shadow-lg
          ${loading || !file
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            Analyzing...
          </>
        ) : (
          "Upload & Analyze"
        )}
      </button>
    </div>
    </>
  );
};

export default UploadResume;