import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import "../style/CoursesPage.css";
import Navbar from "../components/header";
import Footer from "../components/Footer";
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    level: "",
    schedule: "",
    minRating: 0,
    searchQuery: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://myguide.onrender.com/api/courses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    // Filter by level
    if (filters.level && course.level !== filters.level) return false;

    // Filter by schedule
    if (filters.schedule && course.schedule !== filters.schedule) return false;

    // Filter by search query (title or description)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !course.title.toLowerCase().includes(query) &&
        !course.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Navbar />
    <div className="courses-page">
      <h1 style={{ textAlign: "left", margin: "40px 0", borderBottom: "1px solid black", paddingLeft: "2em", fontSize: "40px", fontWeight: "extrabold" }}>COURSES</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
          className="search-input"
        />

        <select
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          className="filter-select"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Mixed">Mixed</option>
        </select>

        <select
          value={filters.schedule}
          onChange={(e) => setFilters({ ...filters, schedule: e.target.value })}
          className="filter-select"
        >
          <option value="">All Schedules</option>
          <option value="month">1 Month</option>
          <option value="2 months">2 Months</option>
          <option value="3 months">3 Months</option>
        </select>
      </div>

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="no-results">No courses match your filters.</div>
        )}
      </div>
      </div>
      <Footer />
      </>
  );
};

export default CoursesPage;
