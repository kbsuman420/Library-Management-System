import { Navigate, Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from "react";


function DashBoardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role != "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden w-full transition-all duration-300 md:ml-64">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashBoardLayout;