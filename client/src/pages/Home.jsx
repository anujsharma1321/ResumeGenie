import React, { useState, useContext } from "react";
import UploadResume from "../components/UploadResume";
import FeedbackCard from "../components/FeedbackCard";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthProvider, AuthContext } from "../Authenticate/AuthContext";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import UserProfile from "../components/userProfile";
import Resume_reviews from "../components/Resume-reviews.jsx";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// Home content (only shown at "/")
const HomeContent = () => {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full">
    

      {user && result ? (
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="w-full md:w-1/2">
            <UploadResume onResult={setResult} />
          </div>
          <div className="w-full md:w-1/2 max-h-[32rem] overflow-y-auto">
            <FeedbackCard feedback={result.feedback} />
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <UploadResume onResult={setResult} />
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeContent />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={user ? <UserProfile /> : <Login />} />
          <Route path="resume-reviews" element={user ? <Resume_reviews /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
