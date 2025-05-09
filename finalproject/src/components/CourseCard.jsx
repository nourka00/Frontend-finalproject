import React from "react";
import "../style/CourseDetail.css";
import { FiHeart } from "react-icons/fi";
import bannerImage from "../assets/banner.png"; // replace with your actual image path

export default function CourseCard() {
  return (
    <div className="course-card">
      <img src={bannerImage} alt="Course" className="course-banner" />

      <div className="info-box">
        <div className="info-section">
          <strong>Materials</strong>
          <p>
            1 PDF
            <br />1 Document
          </p>
        </div>

        <div className="info-section">
          <strong>
            <FiHeart className="icon" /> Y.Y Review
          </strong>
          <p>xx people</p>
        </div>

        <div className="info-section">
          <strong>Beginning Level</strong>
        </div>

        <div className="info-section">
          <strong>Flexible Schedule</strong>
          <p>1 month · 5h per week</p>
        </div>
      </div>
    </div>
  );
}
