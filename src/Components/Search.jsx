// src/components/Search.jsx
import React from "react";

function Search({ search, setSearch }) {
  return (
    <div className="mt-4 flex justify-center">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search todos..."
        className="w-50 border border-gray-800` p-2 rounded-md focus:outline-blue-500 "
      />
    </div>
  );
}

export default Search;
