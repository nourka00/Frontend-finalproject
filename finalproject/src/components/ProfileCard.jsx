import React from "react";
import "../style/ProfileCard.css";
import "font-awesome/css/font-awesome.min.css"; // installed font-awesome via npm
import backgroundImg from "../assets/Gearbackground.png";
import avatarImg from "../assets/avatar labtop hijab.jpg";
import imagehead from "../assets/imghead.png";
import lunet from "../assets/lunet.png";
import mechanical from "../assets/mechdesign.png";
import programming from "../assets/programming.png";
import LineCo from "./LineCo";
import mechanicalDesign from "../assets/mechanicaloptimization.jpg";
import matlabSimulation from "../assets/electricschema.png";
import autoCAD from "../assets/autocaddrawing.png";
const ProfileCard = () => {

  return (
    <div>
      <div className="container">
        <div>
          <div className="card">
            <div
              className="card-header"
              style={{
                backgroundImage: `url(${backgroundImg})`,
              }}
            >
              <div className="card-photo">
                <img src={avatarImg} alt="Avatar" />
              </div>
            </div>
            <div className="card-body">
              <h1 className="card-name">Nour Al-Houda Amer</h1>
              <h2>Industrial & Maintenance Engineer</h2>
              <h3 className="tagline">
                Engineering Reliable Systems, Smart Designs,
                <br /> and Data-Driven Solutions.
              </h3>
              <div className="description">
                <p>
                  I am a Maintenance and Industrial Engineer specializing in
                  mechanical design, system optimization, and MATLAB
                  programming. I develop efficient engineering solutions,
                  optimize maintenance strategies, and simulate mechanical
                  components for improved performance and reliability. With
                  expertise in AutoCAD, SolidWorks, and MATLAB, I also help
                  others enhance their technical skills through my courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="imghead">
        <img src={imagehead} alt="Avatar" />
      </div>

      {/* <div className="projects" style={{ paddingTop: "1em" }}>
        <h2
          className="projects-title"
          style={{
            borderBottom: "1px black solid",
            textAlign: "left",
            paddingLeft: "2em",
          }}
        >
          Projects
        </h2>
        <ul className="projects-list">
          <li className="project-item">
            <img src={mechanicalDesign} alt="" className="project-img" />
            <span>Mechanical Design Optimization</span>
          </li>
          <li className="project-item">
            <img src={matlabSimulation} alt="" className="project-img" />
            <span>MATLAB Simulation of Electrical Circuits</span>
          </li>
          <li className="project-item">
            <img src={autoCAD} alt="" className="project-img" />
            <span>AutoCAD Drafting and Design</span>
          </li>
        </ul>
      </div> */}
      <div className="projects" style={{ paddingTop: "1em" }}>
        <h2
          className="projects-title"
          style={{
            borderBottom: "1px black solid",
            textAlign: "left",
            paddingLeft: "2em",
          }}
        >
          Projects
        </h2>
        <ul className="projects-list">
          <li className="project-item">
            <div className="project-img-container">
              <img
                src={mechanicalDesign}
                alt="Mechanical Design"
                className="project-img"
              />
            </div>
            <span>Mechanical Design Optimization</span>
          </li>
          <li className="project-item">
            <div className="project-img-container">
              <img
                src={matlabSimulation}
                alt="MATLAB Simulation"
                className="project-img"
              />
            </div>
            <span>MATLAB Simulation of Electrical Circuits</span>
          </li>
          <li className="project-item">
            <div className="project-img-container">
              <img src={autoCAD} alt="AutoCAD Design" className="project-img" />
            </div>
            <span>AutoCAD Drafting and Design</span>
          </li>
        </ul>
      </div>
      <div className="services" style={{ paddingTop: "1em" }}>
        <LineCo />
      </div>
    </div>
  );
};

export default ProfileCard;
