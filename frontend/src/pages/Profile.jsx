import { UserCircle, Mail, Phone, MapPin } from 'lucide-react';

function Profile() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 relative text-center sm:text-left">
          {/* Avatar - Centered on mobile, left aligned on larger screens */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 sm:left-8 sm:-translate-x-0 bg-white p-2 rounded-full shadow-lg">
            <UserCircle size={80} className="text-indigo-600" />
          </div>

          <div className="pt-16 sm:pt-16">
            <h3 className="text-2xl font-bold text-gray-800">Admin User</h3>
            <p className="text-indigo-600 font-medium mb-6">Head Librarian</p>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600">
                <Mail size={20} className="text-gray-400" />
                <span>admin@library.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600">
                <Phone size={20} className="text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 text-sm sm:text-base">
                <MapPin size={20} className="text-gray-400 flex-shrink-0" />
                <span>Central Library, 123 Main St, Cityville</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
                Edit Profile
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
