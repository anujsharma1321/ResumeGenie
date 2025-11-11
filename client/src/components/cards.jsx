import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2, FiLoader } from "react-icons/fi";

const Cards = ({ index, name, ats, id, email }) => {
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const getScoreTextColor = (score) => {
    if (score > 80) return "text-green-700";
    if (score > 40) return "text-yellow-700";
    return "text-red-700";
  };

  const getScoreBgColor = (score) => {
    if (score > 80) return "bg-green-100";
    if (score > 40) return "bg-yellow-100";
    return "bg-red-100";
  };

 
const handleSendEmail = async () => {
  try {
    setEmailSent(true);

    const response = await fetch(`http://localhost:5000/api/send-email/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Hello!',
        message: 'This is your message.',
      }),
    });

   
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      alert('Email sent successfully!');
      setEmailSent(false); 
    } else {
      alert('Failed to send email.');
      setEmailSent(false);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Something went wrong.');
    setEmailSent(false);
  }
};


  const handleViewDetails = async () => {
    if (showDetails) {
      setShowDetails(false);
      return;
    }
    if (details) {
      setShowDetails(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/review/view-details/${id}`);
      const data = await res.json();
      setDetails(data);
      setShowDetails(true);
    } catch (err) {
      console.error(err);
      alert("Error fetching review details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/review/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Review deleted successfully");
        window.location.reload(); 
      } else {
        alert("Error deleting review");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting review");
    }
  };
  
  const scoreTextColor = getScoreTextColor(ats);
  const scoreBgColor = getScoreBgColor(ats);

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg my-4">
      {/* --- Top Bar --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        
        {/* Left Side: Name */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            <span className="text-gray-500">{index + 1}.</span> {name}
          </h3>
        </div>

        {/* Right Side: Score & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* ATS Score Badge */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${scoreBgColor} ${scoreTextColor}`}
          >
            ATS Score: {ats}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              onClick={handleViewDetails}
              disabled={isLoading}
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                showDetails ? <FiChevronUp /> : <FiChevronDown />
              )}
              {isLoading ? "Loading..." : (showDetails ? "Hide Details" : "View Details")}
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
              onClick={handleDelete}
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      </div>

  
      <div
        className={`transition-all duration-500 ease-in-out overflow-y-auto snap-start h-64  bg-red-300 ${
          showDetails && details ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Details</h3>
          
          <div className="space-y-3">
            
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-gray-600">ATS Score:</h4>
              <p className={`text-lg font-bold ${getScoreTextColor(details?.atsScore)}`}>
                {details?.atsScore}
              </p>
            </div>

           
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Grammar</h4>
              <p className="text-sm text-gray-600">{details?.feedback?.grammar}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Presentation</h4>
              <p className="text-sm text-gray-600">{details?.feedback?.presentation}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
              <p className="text-sm text-gray-600">{details?.feedback?.skills}</p>
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Suggestions</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
                {Array.isArray(details?.feedback?.suggestions)
                  ? details.feedback.suggestions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  : <li>{details?.feedback?.suggestions}</li>}
              </ul>
            </div>
            
<div className="flex justify-center items-center">
  <button
    onClick={handleSendEmail}
    className={`px-6 py-2 ${emailSent?'bg-green-500':'bg-blue-500'}  ${emailSent?'hover:bg-green-600':'hover:bg-blue-600'} text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out`}
  >
    {emailSent ? 'Email Sending...' : '  📩 Get on Mail'}
  </button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;