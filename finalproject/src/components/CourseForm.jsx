import React from "react";

const CourseForm = ({
  formData,
  handleInputChange,
  handleSkillsChange,
  handleImageChange,
  handleSubmit,
  resetForm,
  editingCourse,
  displaySkills,
}) => {
  return (
    <div className="courses-form-container">
      <form onSubmit={handleSubmit}>
        <h3 className="courses-form-heading">
          {editingCourse ? "Edit Course" : "Add New Course"}
        </h3>

        <div className="courses-form-grid courses-form-grid-cols-2">
          <div>
            <label className="courses-form-label">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="courses-form-input"
              required
            />
          </div>

          <div>
            <label className="courses-form-label">Price*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              className="courses-form-input"
              required
            />
          </div>
        </div>

        <div className="courses-space-y-4">
          <label className="courses-form-label">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="courses-form-textarea"
            required
          />
        </div>

        <div className="courses-form-grid courses-form-grid-cols-3">
          <div>
            <label className="courses-form-label">Schedule</label>
            <select
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              className="courses-form-select"
            >
              <option value="month">1 Month</option>
              <option value="2 months">2 Months</option>
              <option value="3 months">3 Months</option>
            </select>
          </div>

          <div>
            <label className="courses-form-label">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="courses-form-select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="courses-form-label">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={displaySkills}
              onChange={handleSkillsChange}
              className="courses-form-input"
              placeholder="React, Node.js, MongoDB"
            />
            <small className="courses-form-file-info">
              Separate skills with commas
            </small>
          </div>
        </div>

        <div className="courses-space-y-4">
          <label className="courses-form-label">Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="courses-form-input"
          />
          {formData.imagePreview && (
            <div className="courses-space-y-2">
              <img
                src={formData.imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="courses-form-image-preview"
              />
            </div>
          )}
        </div>

        <div className="courses-form-actions">
          <button
            type="button"
            onClick={resetForm}
            className="courses-btn courses-btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="courses-btn courses-btn-primary">
            {editingCourse ? "Update Course" : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
