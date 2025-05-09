import React from "react";
import "../style/ServicesGrid.css"; // Import your CSS file
import Calebrie from "../assets/Calebrie.png";
import Programming from "../assets/programming.png"; 
import Mechanical from "../assets/mechdesign.png";
import Lunet from "../assets/lunet.png";
const ServicesGrid = () => {
  return (
    <div className="services-grid">
      <div className="service-item">
        <img src={Mechanical} alt="Mechanical Design" />{" "}
        {/* Replace with your actual image path */}
        <h3>Mechanical Design</h3>
        <ul>
          <li>Create 3D CAD Models Using AutoCAD and SolidWorks.</li>
          <li>Design Parts And Assemblies For Industrial Systems.</li>
          <li>
            Prepare Technical Drawings And Documentation For Manufacturing.
          </li>
        </ul>
      </div>

      <div className="service-item">
        <img
          src={Calebrie}
          alt="Maintenance Optimization"
        />{" "}
        {/* Replace with your actual image path */}
        <h3>Maintenance Optimization</h3>
        <ul>
          <li>Analyze Machine Failures And Suggest Design Improvements.</li>
          <li>Implement Preventive And Predictive Maintenance Strategies.</li>
          <li>Improve System Reliability And Reduce Downtime.</li>
        </ul>
      </div>

      <div className="service-item">
        <img src={Programming} alt="MATLAB Programming" />{" "}
        {/* Replace with your actual image path */}
        <h3>MATLAB Programming</h3>
        <ul>
          <li>
            Model and Simulate Mechanical Systems (Simulink, Simscape,
            SimMechanics).
          </li>
          <li>Develop Control Algorithms (PID, MPC) For System Automation.</li>
          <li>Analyze And Visualize Data For System Evaluation.</li>
        </ul>
      </div>

      <div className="service-item">
        <img src={Lunet} alt="Training & Courses" />{" "}
        {/* Replace with your actual image path */}
        <h3>Training & Courses</h3>
        <ul>
          <li>
            Offer Practical Training Courses In AutoCAD, SolidWorks, And MATLAB.
          </li>
          <li>Teach Engineering Concepts Through Hands-On Projects.</li>
          <li>
            Help Learners Build Basic Skills For Academic And Professional Use.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServicesGrid;
