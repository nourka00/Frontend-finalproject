import React from "react";
import ImageLine from "../components/line";
import Calebrie from "../assets/Calebrie.png";
import Programming from "../assets/programming.png";
import Mechanical from "../assets/mechdesign.png";
import Lunet from "../assets/lunet.png";
const LineCo = () => {
  const timelineData = [
    {
      title: "Mechanical Design",
      description: [
        "Create 2D/3D Models Using AutoCAD and SolidWorks",
        "Design Systems and Assemblies for Product Functionality",
        "Prepare Technical Drawings and Documentation for Manufacturing",
      ],
      imageUrl: Mechanical,
    },
    {
      title: "MATLAB Programming",
      description: [
        "Model and Simulate Mechanical, Electrical, and Control Systems",
        "Use Toolboxes: Simulink, Fuzzy, PID, Optimization, and More",
        "Automate Calculations and Data Analysis",
      ],
      imageUrl: Programming,
    },
    {
      title: "Training & Courses",
      description: [
        "Online & Recorded Courses in Math, CAD, Programming, etc.",
        "Hands-On Workshops & Tool Usage",
        "Academic Coaching: Help for Academic and Graduation Projects",
      ],
      imageUrl: Lunet,
    },
    {
      title: "Maintenance Optimization",
      description: [
        "Analyze Machine Failures and Inspect Design Improvements",
        "Develop Integrated Maintenance Plans",
        "Improve System Reliability and Reduce Downtime",
      ],
      imageUrl: Calebrie,
    },
  ];

  return (
    <div className="App">
      <h2 style={{ textAlign: "left", margin: "40px 0", borderBottom: "1px solid black", paddingLeft: "2em" }}>
      How can I help you?
      </h2>
      <ImageLine items={timelineData} />
    </div>
  );
};
export default LineCo;