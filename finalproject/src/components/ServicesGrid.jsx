import React from "react";
import "../style/ServicesGrid.css"; // Your CSS file
import Calebrie from "../assets/Calebrie.png";
import Programming from "../assets/programming.png";
import Mechanical from "../assets/mechdesign.png";
import Lunet from "../assets/lunet.png";
import { FiCircle } from "react-icons/fi";

const services = [
  {
    title: "Mechanical Design",
    image: Mechanical,
    points: [
      "Create 2D/3D Models Using AutoCAD and SolidWorks",
      "Design Systems and Assemblies for Product Functionality",
      "Prepare Technical Drawings and Documentation for Manufacturing",
    ],
  },
  {
    title: "Maintenance Optimization",
    image: Calebrie,
    points: [
      "Analyze Machine Failures and Inspect Design Improvements",
      "Develop Integrated Maintenance Plans",
      "Improve System Reliability and Reduce Downtime",
    ],
  },
  {
    title: "MATLAB Programming",
    image: Programming,
    points: [
      "Model and Simulate Mechanical, Electrical, and Control Systems",
      "Use Toolboxes: Simulink, Fuzzy, PID, Optimization, and More",
      "Automate Calculations and Data Analysis",
    ],
  },
  {
    title: "Training & Courses",
    image: Lunet,
    points: [
      "Online & Recorded Courses in Math, CAD, Programming, etc.",
      "Hands-On Workshops & Tool Usage",
      "Academic Coaching: Help for Academic and Graduation Projects",
    ],
  },
];

export default function Services() {
  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <div className="service-text">
            <h2>{service.title}</h2>
            <ul>
              {service.points.map((point, i) => (
                <li key={i}>
                  <FiCircle className="icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="image-content">
            <img src={service.image} alt={service.title} />
          </div>
        </div>
      ))}
    </div>
  );
}
