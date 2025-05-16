import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import AddReviewForm from "../components/AddReviewForm";
import "../style/CourseDetailPage.css";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false); // You'll need to implement this based on your auth

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);

        // Fetch course details
        const courseResponse = await fetch(
          `http://localhost:3000/api/courses/${id}`
        );
        if (!courseResponse.ok) throw new Error("Failed to fetch course");
        const courseData = await courseResponse.json();
        setCourse(courseData);

        // Fetch reviews
        const reviewsResponse = await fetch(
          `http://localhost:3000/api/courses/${id}/reviews`
        );
        if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        // Check if user is enrolled (you'll need to implement this)
        // setIsEnrolled(await checkEnrollment(id));
      } catch (err) {
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

      if (!response.ok) throw new Error("Failed to add review");

      const newReview = await response.json();
      setReviews([...reviews, newReview]);
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!course) return <div className="not-found">Course not found</div>;

  return (
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

          <button className="enroll-btn">Enroll Now</button>
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

          {isEnrolled && <AddReviewForm onSubmit={handleAddReview} />}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
