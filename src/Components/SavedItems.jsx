// src/components/SavedItems.jsx
import React from "react";
import { useItems } from "../Context/ItemContext";

function SavedItems() {
  const { items } = useItems();
  
  return (
    <div className="p-5 font-sans">
      <h3 className="text-lg font-semibold mb-2">Saved Items</h3>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm">No items yet.</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-md p-3 mb-3"
        >
          <h4 className="font-semibold mb-1">{item.title}</h4>
          <p className="mb-1 text-sm">{item.description}</p>
          <small className="text-xs text-gray-500">
            Created At: {item.createdAt}
          </small>
        </div>
      ))}
    </div>
  );
}

export default SavedItems;
