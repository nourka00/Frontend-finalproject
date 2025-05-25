import React from "react";
import CourseMaterialList from "./CourseMaterialList";

const CourseTable = ({
  courses,
  handleEdit,
  handleDeleteCourse,
  selectedCourseId,
  fetchMaterials,
  handleAddMaterial,
  materials,
  handleDeleteMaterial,
  deleting,
}) => {
  return (
    <div className="courses-table-container">
      <table className="courses-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <React.Fragment key={course.id}>
              <tr>
                <td>
                  {course.image ? (
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="courses-table-image"
                    />
                  ) : (
                    <div className="courses-table-image-placeholder">
                      No Image
                    </div>
                  )}
                </td>
                <td className="courses-material-title">{course.title}</td>
                <td className="courses-table-truncate">{course.description}</td>
                <td>${course.price}</td>
                <td>
                  <div className="courses-table-actions">
                    <button
                      onClick={() => handleEdit(course)}
                      className="courses-btn courses-btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="courses-btn courses-btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        fetchMaterials(course.id);
                      }}
                      className="courses-btn courses-btn-success"
                    >
                      View Materials
                    </button>
                    <button
                      onClick={() => handleAddMaterial(course.id)}
                      className="courses-btn courses-btn-purple"
                    >
                      Add Material
                    </button>
                  </div>
                </td>
              </tr>

              {selectedCourseId === course.id && (
                <tr>
                  <td colSpan="5" className="courses-materials-section">
                    <h4 className="courses-materials-heading">
                      Course Materials
                    </h4>
                    {materials.length === 0 ? (
                      <p className="courses-materials-empty">
                        No materials available
                      </p>
                    ) : (
                      <CourseMaterialList
                        materials={materials}
                        handleDeleteMaterial={handleDeleteMaterial}
                        deleting={deleting}
                      />
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
