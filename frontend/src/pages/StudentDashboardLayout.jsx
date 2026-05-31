import { useState } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, ClipboardList, CheckSquare,
  User, LogOut, X, Menu, Bell, ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/student-dashboard", icon: <LayoutDashboard size={20} />, end: true },
  { label: "Browse Books", path: "/student-dashboard/books", icon: <BookOpen size={20} /> },
  { label: "Borrow Records", path: "/student-dashboard/borrow-records", icon: <ClipboardList size={20} /> },
  { label: "Return Records", path: "/student-dashboard/return-records", icon: <CheckSquare size={20} /> },
  { label: "Profile", path: "/student-dashboard/profile", icon: <User size={20} /> },
];

function StudentSidebar({ isOpen, setIsOpen, handleLogout }) {

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-emerald-900 to-teal-900 text-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-emerald-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-emerald-900" />
            </div>
            <span className="text-base font-bold tracking-wide">LibraryMS</span>
          </div>
          <button
            className="md:hidden p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-700/50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Student badge */}
        <div className="px-4 py-3 mx-3 mt-4 bg-emerald-700/30 rounded-xl border border-emerald-700/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-emerald-900">AS</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Alex Student</p>
              <p className="text-xs text-emerald-300 truncate">STU-2024-001</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-emerald-200 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-emerald-300" : "text-emerald-400 group-hover:text-emerald-300"}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-emerald-300" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-emerald-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-emerald-200 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 text-sm font-medium"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

function StudentHeader({ setIsOpen }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-gray-800">Student Portal</h2>
          <p className="text-xs text-gray-400">Library Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-5">

        <button className="relative p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">AS</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Alex Student</p>
            <p className="text-xs text-gray-400">Active Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StudentDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("hi")
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log(token);
  console.log(role);

  if (!token || role !== "student") {
    console.log("hi")
    return <Navigate to="/login" />
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <StudentHeader setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentDashboardLayout;