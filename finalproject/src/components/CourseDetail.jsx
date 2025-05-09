import React, { useEffect, useState } from "react";
import "../style/CourseDetail.css";
import axios from "axios";

const CourseDetails = ({ courseId }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`https://myguide.onrender.com/api/courses/${courseId}`)
      .then((res) => {
        setCourse(res.data);
      });
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-container">
      <h2>{course.title}</h2>
      <p className="description">{course.description}</p>
      <button className="enroll-btn">Enroll the course</button>

      <h3 className="section-title">What you'll learn</h3>
      <ul className="learning-points">
        <li>✔️ Computer programming in general and MATLAB language.</li>
        <li>✔️ Algorithm efficiency and complexity introduction.</li>
      </ul>

      <h4>Skills you'll gain</h4>
      <div className="skills">
        {course.skills.map((skill, index) => (
          <span key={index} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>

      <h4 className="review-title">Review</h4>
      <div className="reviews">
        {course.reviews.map((review) => (
          <div key={review.id} className="review-card">
            <strong>{review.user.username}</strong>
            <div>{"❤️".repeat(review.rating)}</div>
            <p>{review.comment}</p>
          </div>
        ))}
        <textarea placeholder="Your review..." />
        <button className="submit-btn">Submit</button>
      </div>

      <h4>Related Courses</h4>
      <div className="related-courses">
        {course.relatedCourses.map((c) => (
          <div key={c.id} className="related-card">
            <img src={c.thumbnail || "/placeholder.png"} alt={c.title} />
            <p>{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
