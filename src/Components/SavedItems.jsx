// src/components/SavedItems.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../Lib/lib";
import EditTodoForm from "./EditForm";
import Search from "./Search";

function SavedItems() {
  const [data, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTodosData = async () => {
      setLoading(true);
      setError(null);
      try {

        const response = await axios.get(`${ApiUrl}/getTodoData`, {
          params: { page, limit },
        });

        const res = response.data;
   
        setDatas(Array.isArray(res.data) ? res.data : []);
      
        setTotalPages(res.totalPages ?? 1);
        setTotalDocuments(res.totalDocuments ?? 0);
        setHasNextPage(Boolean(res.hasNextPage));
        setHasPrevPage(Boolean(res.hasPrevPage));
      } catch (err) {
        console.error("Fetch todos error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTodosData();
  }, [page, limit]); 

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;

  const handleUpdated = (updatedTodo) => {
    setDatas((prev) =>
      prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${ApiUrl}/deleteTodo/${id}`);
      setDatas((prev) => prev.filter((t) => t._id !== id));
     

      if (data.length === 1 && page > 1) setPage((p) => p - 1);
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Failed to delete todo. Please try again.");
    }
  };

  const filteredData = data.filter((d) => {
    const text = `${d.title ?? ""} ${d.description ?? d.content ?? ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-5 font-sans">
      <h3 className="text-lg font-semibold mb-2">Saved Items</h3>

      <div className="flex items-center justify-between gap-4">
        <Search search={search} setSearch={setSearch} />

        <div className="flex items-center gap-2">
          <label className="text-sm">Items / page:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); 
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">No items yet.</p>
      )}

      {data.length > 0 && filteredData.length === 0 && search && (
        <p className="text-gray-500 text-sm mt-4">
          No tasks found for "<span className="font-semibold">{search}</span>"
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((d) => (
          <div
            key={d._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold text-base mb-2">{d.title}</h4>
            <p className="text-sm text-gray-700 mb-2">
              {d.description || d.content || "No description"}
            </p>
            <small className="text-xs text-gray-500 block mb-3">
              Created At: {d.createdAt || "—"}
            </small>

            <div className="flex justify-center gap-3 mt-1">
              <button
                onClick={() => setEditingTodo(d)}
                className="px-4 py-1.5 text-md bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="px-4 py-1.5 text-md bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {data.length} of {totalDocuments} items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={!hasPrevPage}
            className={`px-3 py-1 rounded border ${
              hasPrevPage ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              if (
                p === 1 ||
                p === totalPages ||
                (p >= page - 2 && p <= page + 2)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-1 rounded border ${
                      p === page ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              } else {
            
                const prev = i > 0 ? i : 0;
              
                return null;
              }
            })}
          
            {totalPages > 7 && page <= totalPages - 3 && page > 4 && (
              <span className="px-2">…</span>
            )}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={!hasNextPage}
            className={`px-3 py-1 rounded border ${
              hasNextPage ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
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
