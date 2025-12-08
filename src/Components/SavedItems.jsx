// src/components/SavedItems.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../Lib/lib";
import EditTodoForm from "./EditForm";

function SavedItems() {
  const [data, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchTodosData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}getTodoData`);
        setDatas(response.data.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchTodosData();
  }, []);

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;

  const handleUpdated = (updatedTodo) => {
    setDatas((prev) =>
      prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
  };

  // 🔴 DELETE HANDLER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    try {
      // Call your DELETE API
      await axios.delete(`${ApiUrl}deleteTodo/${id}`);

      // Remove from UI
      setDatas((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Failed to delete todo. Please try again.");
    }
  };

  return (
    <div className="p-5 font-sans">
      <h3 className="text-lg font-semibold mb-4">Saved Items</h3>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm">No items yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((d) => (
          <div
            key={d._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold text-base mb-2">{d.title}</h4>
            <p className="text-sm text-gray-700 mb-2">
              {d.description || d.content}
            </p>
            <small className="text-xs text-gray-500 block mb-3">
              Created At: {d.createdAt}
            </small>

            <div className="flex justify-center gap-3 mt-1">
              <button
                onClick={() => setEditingTodo(d)}
                className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="px-4 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditTodoForm
        isOpen={!!editingTodo}
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}

export default SavedItems;
