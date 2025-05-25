import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/enrollmentsTable.css"; // Assuming you have a CSS file for styling
const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const baseURL = "https://myguide.onrender.com/api";
  const token = localStorage.getItem("token");

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`${baseURL}/purchases/enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateEnrollmentStatus = async (enrollmentId, newStatus) => {
    try {
      const response = await axios.patch(
        `${baseURL}/purchases/${enrollmentId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Enrollment status updated");
      setEnrollments(
        enrollments.map((e) =>
          e.id === enrollmentId ? { ...e, status: newStatus } : e
        )
      );
    } catch (err) {
      toast.error("Failed to update enrollment");
      console.error(err);
    }
  };

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await fetchEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadEnrollments();
  }, []);

  if (loading) return <div>Loading enrollments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="enrollments-table">
      <h2>Enrollments Management</h2>

      {showDetails && selectedEnrollment && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enrollment Details</h3>
            <p>
              <strong>User:</strong> {selectedEnrollment.User?.name}
            </p>
            <p>
              <strong>Course:</strong> {selectedEnrollment.Course?.title}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEnrollment.purchase_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {selectedEnrollment.payment_method}
            </p>
            <p>
              <strong>Status:</strong> {selectedEnrollment.status}
            </p>
            {selectedEnrollment.proof_of_payment && (
              <p>
                <strong>Proof:</strong>
                <a
                  href={selectedEnrollment.proof_of_payment}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Proof
                </a>
              </p>
            )}
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Course</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.User?.name || "N/A"}</td>
              <td>{enrollment.Course?.title || "N/A"}</td>
              <td>{new Date(enrollment.purchase_date).toLocaleDateString()}</td>
              <td>
                <select
                  value={enrollment.status}
                  onChange={(e) =>
                    updateEnrollmentStatus(enrollment.id, e.target.value)
                  }
                  className={`status-select ${enrollment.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </td>
            
              <td>
                <button
                  className="btn-view"
                  onClick={() => {
                    setSelectedEnrollment(enrollment);
                    setShowDetails(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentsTable;