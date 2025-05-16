import React from "react";
import "../style/ImageLine.css"; // Import your CSS file for styling

const ImageLine = ({ items }) => {
  return (
    <div className="center-line">
      {items.map((item, index) => (
        <div
          key={index}
          className={`line-item ${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="line-content">
            {index % 2 === 0 ? (
              <>
                <div className="text-content">
                  <h2>{item.title}</h2>
                  <div className="description-container">
                    {item.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                </div>
                <div className="image-content">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              </>
            ) : (
              <>
                <div className="image-content">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="text-content">
                  <h2>{item.title}</h2>
                  <div className="description-container">
                    {item.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="line-marker">
            <div className="marker-dot"></div>
            {index !== items.length - 1 && <div className="marker-line"></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

  

export default ImageLine;
