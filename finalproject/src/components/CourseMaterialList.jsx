import React from "react";

const CourseMaterialList = ({ materials, handleDeleteMaterial, deleting }) => {
  return (
    <div className="courses-materials-list">
      {materials.map((material) => (
        <div key={material.id} className="courses-material-item">
          <div className="courses-material-info">
            <div className="courses-material-title">{material.title}</div>
            <div className="courses-material-meta">
              Type: {material.material_type} | Uploaded:{" "}
              {new Date(material.uploaded_at).toLocaleDateString()}
            </div>
            {material.file_url && (
              <a
                href={material.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="courses-material-link"
              >
                Download File
              </a>
            )}
          </div>
          <button
            onClick={() => handleDeleteMaterial(material.id)}
            disabled={deleting}
            className={`courses-material-delete-btn ${
              deleting ? "courses-disabled" : ""
            }`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseMaterialList;
