// src/components/AddForm.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useItems } from "../Context/ItemContext";

function AddForm() {
  const [showForm, setShowForm] = useState(false);
  const { addItems } = useItems();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdAt: "",
  });

  const [errors, setErrors] = useState({});
  const [submitPayload, setSubmitPayload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (name === "title") {
      if (!value.trim()) newErrors.title = "Title is required";
      else if (value.trim().length < 3)
        newErrors.title = "Title must be at least 3 characters";
      else delete newErrors.title;
    }

    if (name === "description") {
      if (!value.trim()) newErrors.description = "Description is required";
      else if (value.trim().length < 10)
        newErrors.description = "Description must be at least 10 characters";
      else delete newErrors.description;
    }

    setErrors(newErrors);
  };

  const openForm = () => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    setFormData({
      title: "",
      description: "",
      createdAt: timestamp,
    });

    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    if (isSubmitting) return;
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate(name, value);
  };


  useEffect(() => {
    if (!submitPayload) return;

    const postTodo = async () => {
      setIsSubmitting(true);
      try {
        const res = await axios.post(
          "http://localhost:3000/addTodo",
          submitPayload
        );

        const savedItem = res.data || submitPayload;
        console.log("API Response:", savedItem);

        
        addItems(savedItem);

        alert("Item added successfully!");

     
        setShowForm(false);
        setFormData({
          title: "",
          description: "",
          createdAt: "",
        });
      } catch (error) {
        console.error("API Error:", error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while saving";
        alert(message);
      } finally {
        setIsSubmitting(false);
        setSubmitPayload(null); 
      }
    };

    postTodo();
  }, [submitPayload, addItems]);

  const handleSave = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formdata.entries());
    console.log("formdataa", dataObj);

    const newErrors = {};
    const title = dataObj.title?.trim() || "";
    const description = dataObj.description?.trim() || "";

    if (!title) newErrors.title = "Title is required";
    else if (title.length < 3)
      newErrors.title = "Title must be at least 3 characters";

    if (!description) newErrors.description = "Description is required";
    else if (description.length < 10)
      newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix errors before saving");
      return;
    }

    
    setFormData((prev) => ({
      ...prev,
      title,
      description,
    }));

   ``
    setSubmitPayload({
      title,
      description,
      createdAt: formData.createdAt,
    });
  };

  const isFormValid =
    formData.title.trim().length >= 3 &&
    formData.description.trim().length >= 10 &&
    Object.keys(errors).length === 0;

  const modal =
    showForm &&
    createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            Add New Item
          </h3>
          <hr className="mb-6" />

          <form onSubmit={handleSave}>
            <div className="mb-5">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 text-sm ${
                  errors.title
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter item title (min 3 chars)"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 resize-none text-sm ${
                  errors.description
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter item description (min 10 chars)"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Created At
              </label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 text-sm cursor-not-allowed"
                readOnly
              />
            </div>

            <hr className="mt-4 mb-4" />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`px-6 py-2 rounded-lg text-sm font-medium text-white ${
                  isFormValid && !isSubmitting
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Item"}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("modal-root") || document.body
    );

  return (
    <div className="p-5 font-sans">
      <button
        onClick={openForm}
        className="px-4 py-2 rounded border border-gray-800 cursor-pointer hover:bg-gray-100"
      >
        Add
      </button>

      {modal}
    </div>
  );
}

export default AddForm;
