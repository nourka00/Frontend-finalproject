import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/CourseCard.css";

const CourseCard = ({ course }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://myguide.onrender.com/api/courses/${course.id}/reviews`
        );
        const data = response.data;
        setReviews(data);

        if (data.length > 0) {
          const avg =
            data.reduce((sum, review) => sum + review.rating, 0) / data.length;
          setAverageRating(avg.toFixed(1));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [course.id]);

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course-card" onClick={handleCourseClick}>
      <div className="course-image-container">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="course-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=Course+Image";
            }}
          />
        )}
      </div>

      <div className="course-details">
        <h3 className="course-title">{course.title}</h3>
        <div className="course-skills">
          {course.skills &&
            course.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
        </div>
        <div className="course-meta">
        
          <span className="course-rating">
            ⭐ {averageRating || "No reviews"} ({reviews.length})
          </span>
          <div>
            <span className="course-schedule">
              {course.schedule}-{course.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
