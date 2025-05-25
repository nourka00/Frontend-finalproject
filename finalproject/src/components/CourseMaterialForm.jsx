import React from "react";

const CourseMaterialForm = ({
  materialForm,
  setMaterialForm,
  handleMaterialFileChange,
  handleMaterialUpload,
  setShowMaterialForm,
  uploading,
}) => {
  return (
    <div className="courses-form-container">
      <h3 className="courses-form-heading">Upload Course Material</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMaterialUpload();
        }}
        className="courses-space-y-4"
      >
        <div>
          <label className="courses-form-label">Title*</label>
          <input
            type="text"
            value={materialForm.title}
            onChange={(e) =>
              setMaterialForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="courses-form-input"
            required
          />
        </div>

        <div>
          <label className="courses-form-label">Material Type</label>
          <select
            value={materialForm.materialType}
            onChange={(e) =>
              setMaterialForm((prev) => ({
                ...prev,
                materialType: e.target.value,
              }))
            }
            className="courses-form-select"
          >
            <option value="pdf">PDF</option>
            <option value="document">Document</option>
          </select>
        </div>

        <div>
          <label className="courses-form-label">File*</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleMaterialFileChange}
            className="courses-form-input"
            required
          />
          {materialForm.file && (
            <div className="courses-form-file-info">
              Selected: {materialForm.file.name} (
              {(materialForm.file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        <div className="courses-form-actions">
          <button
            type="button"
            onClick={() => {
              setShowMaterialForm(false);
              setMaterialForm({
                title: "",
                materialType: "pdf",
                file: null,
              });
            }}
            className="courses-btn courses-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className={`courses-btn courses-btn-primary ${
              uploading ? "courses-disabled" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload Material"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseMaterialForm;
