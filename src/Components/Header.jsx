import React from 'react'

function Header() {

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return (
        <div className="w-full bg-blue-500 p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold w-full text-center">
                    ToDo App
                </h1>
                <div className="absolute right-4 flex gap-3">
                    <button className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                        Restore
                    </button>
                    <button className="px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition" onClick={handleLogout}>
                   Logout
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Header