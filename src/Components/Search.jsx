import React from 'react'

function Search() {
  return (
    <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-1/2 border border-gray-300 p-2 rounded-md focus:outline-blue-500"
        />
      </div>
  )
}

export default Search