import { useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Shield, Edit2, Lock, Calendar, BookOpen, CheckCircle, X, Save } from 'lucide-react';

const ADMIN = {
  name: 'Admin User',
  email: 'admin@gmail.com',
  phone: '+1 (555) 123-4567',
  location: 'Central Library, 123 Main St, Cityville',
  role: 'Head Librarian',
  joined: 'January 15, 2023',
  totalBooksManaged: 3842,
  totalTransactions: 2227,
};

const INFO_ITEMS = [
  { icon: <Mail size={17} />, label: 'Email', key: 'email' },
  { icon: <Phone size={17} />, label: 'Phone', key: 'phone' },
  { icon: <MapPin size={17} />, label: 'Location', key: 'location' },
  { icon: <Calendar size={17} />, label: 'Joined', key: 'joined' },
];

function Profile() {
  const [admin, setAdmin] = useState(ADMIN);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: admin.name, phone: admin.phone, location: admin.location });
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });
  const [passError, setPassError] = useState('');

  const handleEditSave = (e) => {
    e.preventDefault();
    setAdmin((prev) => ({ ...prev, ...editForm }));
    setShowEditModal(false);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passForm.next !== passForm.confirm) { setPassError('Passwords do not match.'); return; }
    if (passForm.next.length < 6) { setPassError('Password must be at least 6 characters.'); return; }
    setPassError('');
    setPassForm({ current: '', next: '', confirm: '' });
    setShowPasswordModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Gradient Banner */}
        <div className="h-28 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-8 relative">
          {/* Avatar */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 sm:left-8 sm:-translate-x-0 bg-white p-1.5 rounded-full shadow-lg ring-4 ring-white">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-white">AU</span>
            </div>
          </div>

          {/* Name + Role */}
          <div className="pt-14 sm:pt-12 text-center sm:text-left sm:ml-28">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <h2 className="text-xl font-extrabold text-gray-900">{admin.name}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full w-fit mx-auto sm:mx-0">
                <Shield size={11} />
                {admin.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{admin.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-4">
            <button
              onClick={() => { setEditForm({ name: admin.name, phone: admin.phone, location: admin.location }); setShowEditModal(true); }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 text-sm flex-1 sm:flex-none"
            >
              <Edit2 size={15} /> Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 text-sm flex-1 sm:flex-none"
            >
              <Lock size={15} /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Books Managed', value: admin.totalBooksManaged.toLocaleString(), icon: <BookOpen size={20} />, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Transactions', value: admin.totalTransactions.toLocaleString(), icon: <CheckCircle size={20} />, color: 'bg-emerald-50 text-emerald-600' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
            <div>
              <p className="text-xs font-medium text-gray-500">{label}</p>
              <p className="text-xl font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">Account Information</h3>
        <div className="space-y-4">
          {INFO_ITEMS.map(({ icon, label, key }) => (
            <div key={key} className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-500 flex-shrink-0 mt-0.5">{icon}</div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5 break-words">{admin[key]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="p-6 space-y-4">
              {[
                { label: 'Full Name', name: 'name', type: 'text' },
                { label: 'Phone Number', name: 'phone', type: 'tel' },
                { label: 'Location', name: 'location', type: 'text' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={editForm[name]}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [name]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
              <button onClick={() => { setShowPasswordModal(false); setPassError(''); }} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePasswordSave} className="p-6 space-y-4">
              {[
                { label: 'Current Password', name: 'current' },
                { label: 'New Password', name: 'next' },
                { label: 'Confirm New Password', name: 'confirm' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="password"
                    value={passForm[name]}
                    onChange={(e) => setPassForm((prev) => ({ ...prev, [name]: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  />
                </div>
              ))}
              {passError && <p className="text-xs text-red-500 font-medium">{passError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPassError(''); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
                  <Lock size={15} /> Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
