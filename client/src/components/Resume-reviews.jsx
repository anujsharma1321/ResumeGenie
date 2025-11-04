import React, { useState,useEffect,useContext} from 'react';
import { AuthContext } from "../Authenticate/AuthContext";
import Cards from './cards.jsx';
const Resume_reviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/review/resume-reviews/${user.id}`);
          const data = await res.json();
          setReviews(data || []);
        }catch (err) {
          alert('Error fetching Data');
        }
      };
      if (user.id) fetchProfile();
    }, [user.id]);

  return(
    <>
     <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    <div className=" flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Your Resume Reviews
      </h2>
      <div className="w-full max-w-4xl">
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-center">No reviews found.</p>
        ) : (
          reviews.map((review, index) => (
            <Cards key={index} index={index} name={user.name} ats={review.atsScore} id={review._id} email={user.email}/>
          ))
        )}
      </div>
    </div>        
  </>
  )};
export default Resume_reviews;
