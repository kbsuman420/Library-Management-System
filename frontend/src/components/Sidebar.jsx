import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Book, ClipboardList, CheckSquare, User, X } from 'lucide-react';

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Books', path: '/books', icon: <Book size={20} /> },
    { name: 'Borrow Records', path: '/borrow-records', icon: <ClipboardList size={20} /> },
    { name: 'Return Books Records', path: '/return-records', icon: <CheckSquare size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Logo & Close Button */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-indigo-800">
          <h1 className="text-xl font-bold tracking-wider">Library App</h1>
          <button
            className="md:hidden text-indigo-200 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile when navigating
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-gray-500 text-white' : 'text-indigo-100 hover:bg-gray-500'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
