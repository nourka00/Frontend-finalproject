// src/components/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import OrdersTable from "../components/OrdersTable";
import EnrollmentsTable from "../components/EnrollmentsTable";
import CoursesManager from "./CoursesManager";
import "../style/admin.css"; // Assuming you have a CSS file for admin styles
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
     
    <div className="admin-dashboard">
        <div className="admin-header">
          <h4><Link to="/">Home</Link></h4>
          <h1>Admin Dashboard</h1>
        </div>

      <nav className="admin-nav">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={activeTab === "enrollments" ? "active" : ""}
          onClick={() => setActiveTab("enrollments")}
        >
          Enrollments
        </button>
        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>
      </nav>

      <div className="admin-content">
        {activeTab === "users" && <UsersTable />}
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "enrollments" && <EnrollmentsTable />}
        {activeTab === "courses" && <CoursesManager />}
      </div>
    </div></>
  );
};

export default AdminDashboard;
