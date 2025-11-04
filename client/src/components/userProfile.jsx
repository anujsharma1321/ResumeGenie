import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../Authenticate/AuthContext";
// I'm adding react-icons for the loading spinner.
// You can install it with: npm install react-icons
import { FiLoader, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// A small component to display feedback messages
const FeedbackMessage = ({ type, message }) => {
  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-100' : 'bg-green-100';
  const textColor = isError ? 'text-red-700' : 'text-green-700';
  const Icon = isError ? FiAlertCircle : FiCheckCircle;

  if (!message) return null;

  return (
    <div className={`p-3 rounded-md ${bgColor} flex items-center gap-3`}>
      <Icon className={`h-5 w-5 ${textColor}`} />
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
    </div>
  );
};

const ProfileEditPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    skills: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${user.id}`);
        const data = await res.json();
        
        if (res.ok) {
          // Format date for the input[type="date"]
          const formattedDate = data.dateOfBirth 
            ? new Date(data.dateOfBirth).toISOString().split('T')[0] 
            : '';

          setFormData({
            name: data.name || '',
            email: data.email || '',
            dateOfBirth: formattedDate,
            gender: data.gender || '',
            location: data.location || '',
            skills: data.skills?.join(', ') || '',
          });
        } else {
          setFeedback({ type: 'error', message: data.message || 'Failed to fetch profile' });
        }
      } catch (err) {
        setFeedback({ type: 'error', message: 'An error occurred while fetching your profile.' });
      } finally {
        setIsLoading(false);
      }
    };
    if (user.id) fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission and page reload
    setIsLoading(true);
    setFeedback({ type: '', message: '' });

  
    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean), // [React, Node]
    };

    try {
      const response = await fetch(`http://localhost:5000/api/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setFeedback({ type: 'success', message: result.message || "Profile updated successfully!" });
      } else {
        setFeedback({ type: 'error', message: result.message || "Failed to update profile." });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
    
    <div className=" bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] min-h-screen  flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 md:p-10 space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Edit Profile
        </h2>

        {/* --- Form Fields Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. New York, NY"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. React, Tailwind, Express"
            />
            <p className="mt-1 text-xs text-gray-500">Separate skills with a comma.</p>
          </div>
        </div>

        {/* --- Feedback and Submit Button --- */}
        <div className="space-y-4 pt-4">
          <FeedbackMessage type={feedback.type} message={feedback.message} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-2.5 px-4 rounded-md shadow-sm hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ProfileEditPage;