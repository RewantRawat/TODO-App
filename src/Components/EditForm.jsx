// src/components/EditTodoForm.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UpdateTodolist } from "../Lib/UpdateTodoList";

function EditTodoForm({ isOpen, todo, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdAt: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!todo) return;
    setFormData({
      title: todo.title || "",
      description: todo.description || todo.content || "",
      createdAt: todo.createdAt || "",
    });
    setErrors({});
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // very small validation
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "title" && value.trim().length < 3
          ? "Min 3 characters"
          : name === "description" && value.trim().length < 10
          ? "Min 10 characters"
          : undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (title.length < 3 || description.length < 10) return;

    try {
      setIsSubmitting(true);

      const payload = {
        title,
        description,
        createdAt: formData.createdAt,
      };

      await UpdateTodolist(todo._id, payload);      // 👈 PUT API TRIGGERED HERE

      const updatedTodo = { ...todo, ...payload };
      onUpdated(updatedTodo);                       // update UI list
      onClose();                                    // close modal
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.trim().length >= 3 &&
    formData.description.trim().length >= 10 &&
    !errors.title &&
    !errors.description;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Edit Todo
        </h3>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 text-sm font-semibold text-gray-800">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
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
              rows={4}
              className="w-full p-3 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
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
              value={formData.createdAt}
              readOnly
              className="w-full p-3 border rounded-lg text-sm bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <hr className="mt-4 mb-4" />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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
              {isSubmitting ? "Updating..." : "Update Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}

export default EditTodoForm;
