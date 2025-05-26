import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import AddReviewForm from "../components/AddReviewForm";
import "../style/CourseDetailPage.css";
import Navbar from "../components/header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import RelatedCourseCard from "../components/RelatedCourseCard";
const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false); // You'll need to implement this based on your auth
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [transactionId, setTransactionId] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);

        // Fetch course
        const courseRes = await fetch(
          `https://myguide.onrender.com/api/courses/${id}`
        );
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch reviews
        const reviewsRes = await fetch(
          `https://myguide.onrender.com/api/courses/${id}/reviews`
        );
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
        //fetch related course 
        const relatedRes = await fetch(
          `http://localhost:3000/api/courses/${id}/related`
        );
        const relatedData = await relatedRes.json();
        setRelatedCourses(relatedData);

        // Check enrollment
        const token = localStorage.getItem("token");
        const enrollRes = await fetch(
          `https://myguide.onrender.com/api/purchases/courses/${id}/enrollment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const enrollData = await enrollRes.json();
        setIsEnrolled(enrollData.enrolled);
      } catch (err) {
        toast.error(`Failed to load course data: ${err.message}`);
        setError(err.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);
  
  const handleAddReview = async (reviewData) => {
    try {
      const token = localStorage.getItem("token"); // Assuming you store JWT token
      const response = await fetch(
        `https://myguide.onrender.com/api/courses/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        toast.error("Failed to add review");
        return;
      }
      

      const newReview = await response.json();
      setReviews([...reviews, newReview]);
    } catch (err) {
      toast.error("Error adding review");

    }
  };
  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!transactionId || !proofOfPayment) {
      toast.error(
        "Please fill in all fields including transaction ID and proof of payment."
      );
      return;
    }
    
    console.log("Enrolling in course id:", id);
    const formData = new FormData();
    formData.append("course_id", id);
    formData.append("payment_method", paymentMethod);
    formData.append("transaction_id", transactionId);
    formData.append("proof_of_payment", proofOfPayment);

    try {
      const response = await fetch(`https://myguide.onrender.com/api/purchases`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errRes = await response.json();
        toast.error(errRes.error || "Enrollment failed");
        return;
      }
      
      toast.success("Enrollment successful!");

      setIsEnrolled(true);
      setShowCheckout(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  if (loading) return <div className="loading">Loading course details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!course) return <div className="not-found">Course not found</div>;

  return (
    <>
      <Navbar />
      <div className="course-detail-container">
        <div className="course-header">
          <div className="course-image-container">
            <img
              src={
                course.image ||
                "https://via.placeholder.com/800x400?text=Course+Image"
              }
              alt={course.title}
              className="course-main-image"
            />
          </div>

          <div className="course-info">
            <h1>{course.title}</h1>

            <div className="course-meta">
              <span className={`level-badge ${course.level.toLowerCase()}`}>
                {course.level}
              </span>
              <span className="schedule">{course.schedule}</span>
              <span className="price">${course.price}</span>
            </div>

            <div className="course-skills">
              <h3>Skills You'll Learn:</h3>
              <div className="skills-list">
                {course.skills &&
                  course.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <button
              className="enroll-btn"
              onClick={() => setShowCheckout(true)}
            >
              Enroll Now
            </button>
          </div>
        </div>

        <div className="course-content">
          <div className="course-description">
            <h2>About This Course</h2>
            <p>{course.description}</p>
          </div>

          <div className="course-reviews">
            <h2>Reviews</h2>

            {reviews.length > 0 ? (
              <ReviewList reviews={reviews} />
            ) : (
              <p className="no-reviews">
                No reviews yet. Be the first to review!
              </p>
            )}

            {/* {isEnrolled && <AddReviewForm onSubmit={handleAddReview} />} */}
            {isEnrolled ? (
              <AddReviewForm onSubmit={handleAddReview} />
            ) : (
              <p className="review-access-msg">
                You must enroll to leave a review.
              </p>
            )}
          </div>
          <div className="related-courses-section">
            <h2>Related Courses</h2>
            <div className="related-courses-grid">
              {relatedCourses.length > 0 ? (
                relatedCourses.map((related) => (
                  <div key={related.id} className="related-course-card">
                    <img
                      src={
                        related.image ||
                        "https://via.placeholder.com/300x200?text=Course"
                      }
                      alt={related.title}
                      className="related-course-image"
                    />
                    <h3>{related.title}</h3>
                    <p className="related-course-level">{related.level}</p>
                    <p className="related-course-price">${related.price}</p>
                  </div>
                ))
              ) : (
                <p>No related courses found.</p>
              )}
            </div>
          </div>
        </div>
        {showCheckout && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h2>Checkout</h2>

              <label>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="OMT">OMT</option>
                <option value="mobile_wallet">Mobile Wallet</option>
              </select>

              <label>Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
              />

              <label>Proof of Payment (image)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProofOfPayment(e.target.files[0])}
              />

              <button className="confirm-btn" onClick={handleEnroll}>
                Confirm Enrollment
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CourseDetailPage;
