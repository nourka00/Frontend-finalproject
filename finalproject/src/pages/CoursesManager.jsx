import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CourseForm from "../components/CourseForm";
import CourseTable from "../components/CourseTable";
import CourseMaterialForm from "../components/CourseMaterialForm";
import "../style/AdminCourses.css"; // Assuming you have a CSS file for styling
const CoursesManager = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    schedule: "month",
    level: "Beginner",
    skills: [],
    image: null,
    imagePreview: null,
  });
  const [materialForm, setMaterialForm] = useState({
    title: "",
    materialType: "pdf",
    file: null,
  });

  const baseURL = "https://myguide.onrender.com/api";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getMultipartHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/courses`);
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchMaterials = async (courseId) => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await axios.get(
        `${baseURL}/materials/materials`,
        headers
      );

      const courseMaterials = response.data.filter(
        (material) => material.course_id === Number.parseInt(courseId)
      );

      setMaterials(courseMaterials);
    } catch (err) {
      console.error("Error fetching materials:", err);
      toast.error(err.response?.data?.message || "Failed to fetch materials");
      setMaterials([]);
    }
  };

  const saveCourse = async () => {
    try {
      const headers = getMultipartHeaders();
      if (!headers) return;

      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "skills") {
          formDataObj.append(key, JSON.stringify(value));
        } else if (key === "image" && value) {
          formDataObj.append("image", value);
        } else if (value !== null && key !== "imagePreview") {
          formDataObj.append(key, value);
        }
      });

      let response;
      if (editingCourse) {
        response = await axios.put(
          `${baseURL}/courses/${editingCourse.id}`,
          formDataObj,
          headers
        );
        setCourses(
          courses.map((c) => (c.id === editingCourse.id ? response.data : c))
        );
        toast.success("Course updated successfully");
      } else {
        response = await axios.post(`${baseURL}/courses`, formDataObj, headers);
        setCourses([...courses, response.data]);
        toast.success("Course created successfully");
      }

      resetForm();
    } catch (err) {
      console.error("Save course error:", err);
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to save course"
      );
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const headers = getAuthHeaders();
        if (!headers) return;

        await axios.delete(`${baseURL}/courses/${id}`, headers);
        setCourses(courses.filter((c) => c.id !== id));
        toast.success("Course deleted successfully");
      } catch (err) {
        console.error("Delete course error:", err);
        toast.error(err.response?.data?.message || "Failed to delete course");
      }
    }
  };

  const handleMaterialUpload = async () => {
    try {
      setUploading(true);
      const headers = getMultipartHeaders();
      if (!headers) return;

      if (!materialForm.title || !materialForm.file) {
        toast.error("Please provide both title and file");
        return;
      }

      if (!selectedCourseId) {
        toast.error("No course selected");
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("courseId", selectedCourseId);
      formDataObj.append("title", materialForm.title);
      formDataObj.append("materialType", materialForm.materialType);
      formDataObj.append("file", materialForm.file);

      const response = await axios.post(
        `${baseURL}/upload-material`,
        formDataObj,
        headers
      );

      if (response.data.message === "Upload successful") {
        toast.success("Material uploaded successfully");
        fetchMaterials(selectedCourseId);
        setShowMaterialForm(false);
        setMaterialForm({ title: "", materialType: "pdf", file: null });
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to upload material";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!materialId) {
      toast.error("Invalid material selected");
      return;
    }

    const id =
      typeof materialId === "string" ? Number.parseInt(materialId) : materialId;

    if (isNaN(id) || id <= 0) {
      toast.error("Invalid material ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      setDeleting(true);
      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await axios.delete(`${baseURL}/${id}`, headers);

      if (response.data.message === "File deleted successfully") {
        setMaterials(materials.filter((m) => m.id !== id));
        toast.success("Material deleted successfully");
      } else {
        toast.error(response.data.message || "Deletion failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete material";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const inputValue = e.target.value;
    const skillsArray = inputValue
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const displaySkills = formData.skills.join(", ");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleMaterialFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a PDF or Word document");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }

      setMaterialForm((prev) => ({ ...prev, file }));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      schedule: "month",
      level: "Beginner",
      skills: [],
      image: null,
      imagePreview: null,
    });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      schedule: course.schedule,
      level: course.level,
      skills: course.skills || [],
      image: null,
      imagePreview: course.image || null,
    });
    setShowForm(true);
  };

  const handleAddMaterial = (courseId) => {
    setSelectedCourseId(courseId);
    setShowMaterialForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveCourse();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="courses-text-center courses-py-8">Loading courses...</div>
    );
  if (error)
    return (
      <div className="courses-text-red-500 courses-text-center courses-py-8">
        Error: {error}
      </div>
    );

  return (
    <div className="courses-container">
      <h2 className="courses-heading">Courses Management</h2>

      <button
        onClick={() => setShowForm(true)}
        className="courses-btn courses-btn-primary courses-space-y-2"
      >
        Add New Course
      </button>

      {showForm && (
        <CourseForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSkillsChange={handleSkillsChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editingCourse={editingCourse}
          displaySkills={displaySkills}
        />
      )}

      {showMaterialForm && (
        <CourseMaterialForm
          materialForm={materialForm}
          setMaterialForm={setMaterialForm}
          handleMaterialFileChange={handleMaterialFileChange}
          handleMaterialUpload={handleMaterialUpload}
          setShowMaterialForm={setShowMaterialForm}
          uploading={uploading}
        />
      )}

      <CourseTable
        courses={courses}
        handleEdit={handleEdit}
        handleDeleteCourse={handleDeleteCourse}
        selectedCourseId={selectedCourseId}
        fetchMaterials={fetchMaterials}
        handleAddMaterial={handleAddMaterial}
        materials={materials}
        handleDeleteMaterial={handleDeleteMaterial}
        deleting={deleting}
      />
    </div>
  );
};

export default CoursesManager;
