import React from "react";
import * as XLSX from "xlsx";

function Header({ todos }) {
 console.log("HEADER TODOS:", todos);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const exportExcel = () => {
    if (!todos || todos.length === 0) {
      alert("No todos to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(todos);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "Todos.xlsx");
  };

  return (
    <div className="w-full bg-blue-500 p-4 shadow-sm">
      <div className="flex items-center justify-between relative">
        <h1 className="text-2xl font-bold w-full text-center text-white">
          ToDo App
        </h1>

        <div className="absolute right-4 flex gap-3">
          <button
            onClick={exportExcel}
            className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Export
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
