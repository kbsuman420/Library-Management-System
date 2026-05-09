import { UserCircle, LogOut, Menu, Bell } from 'lucide-react';

function Header({ setIsSidebarOpen }) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      {/* Mobile Hamburger & Welcome */}
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">Welcome back, Admin!</h2>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button className="text-gray-500 hover:text-indigo-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="hidden sm:flex items-center gap-2">
          <UserCircle size={32} className="text-indigo-600" />
          <span className="font-medium text-gray-700">Admin User</span>
        </div>
        
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base">
          <LogOut size={18} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
