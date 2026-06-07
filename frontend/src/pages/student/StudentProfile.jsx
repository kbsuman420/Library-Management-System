import { useState } from "react";
import {
  Mail, Phone, Hash, Shield, BookOpen, BookCheck,
  Edit2, Lock, X, Save, Calendar, CheckCircle
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

const INITIAL_STUDENT = {
  name: "Alex Student",
  email: "alex.student@university.edu",
  phone: "+1 (555) 987-6543",
  studentId: "STU-2024-001",
  department: "Computer Science",
  joined: "August 15, 2024",
  membershipStatus: "Active",
  totalBorrowed: 24,
  totalReturned: 21,
};

const INFO_ITEMS = [
  { icon: <Mail size={16} />, label: "Email", key: "email" },
  { icon: <Hash size={16} />, label: "Student ID", key: "student_id" },

];

function StudentProfile() {

  const borrows = useOutletContext()
  const totalBorrows = borrows.length;
  const totalReturns = borrows.filter((b) => b.status === "Returned").length;


  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: student.name, phone: student.phone, department: student.department });
  const [passForm, setPassForm] = useState({ current: "", next: "", confirm: "" });
  const [passError, setPassError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  console.log("email: ", localStorage.getItem("email"));
  console.log("name: ", localStorage.getItem("fullName"));

  const userDetails = {
    name: localStorage.getItem("fullName"),
    email: localStorage.getItem("email"),
    student_id: "STU001"
  }




  const handleEditSave = (e) => {
    e.preventDefault();
    setStudent((prev) => ({ ...prev, ...editForm }));
    setShowEditModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passForm.next !== passForm.confirm) { setPassError("Passwords do not match."); return; }
    if (passForm.next.length < 6) { setPassError("Password must be at least 6 characters."); return; }
    setPassError("");
    setPassForm({ current: "", next: "", confirm: "" });
    setShowPasswordModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your student account</p>
      </div>

      {/* Success Toast */}
      {saveSuccess && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium px-4 py-3 rounded-xl">
          <CheckCircle size={17} className="text-emerald-600 flex-shrink-0" />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-24 sm:h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative">
          <div
            className="absolute inset-0 opacity-15"
            style={{ backgroundImage: "radial-gradient(circle at 40% 60%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
        </div>

        <div className="px-6 sm:px-8 pb-7 relative">
          {/* Avatar */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 sm:left-8 sm:-translate-x-0 ring-4 ring-white rounded-full shadow-lg">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center w-[72px] h-[72px] sm:w-20 sm:h-20">
              <span className="text-2xl font-extrabold text-white">AS</span>
            </div>
          </div>

          <div className="pt-12 sm:pt-11 text-center sm:text-left sm:ml-28">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <h2 className="text-xl font-extrabold text-gray-900">{userDetails.name}</h2>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold w-fit mx-auto sm:mx-0 ${userDetails.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                }`}>
                <Shield size={10} />
                {/* {userDetails.status} Member */}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{userDetails.email}</p>
            <p className="text-xs text-gray-400">{userDetails.student_id}</p>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={() => { setEditForm({ name: student.name, phone: student.phone, department: student.department }); setShowEditModal(true); }}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 text-sm flex-1 sm:flex-none"
            >
              <Edit2 size={14} /> Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 text-sm flex-1 sm:flex-none"
            >
              <Lock size={14} /> Change Password
            </button>
          </div> */}
        </div>
      </div>

      {/* Borrowing Summary */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Total Borrowed", value: totalBorrows, icon: <BookOpen size={20} />, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
          { label: "Total Returned", value: totalReturns, icon: <BookCheck size={20} />, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
        ].map(({ label, value, icon, color, border }) => (
          <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-5 flex items-center gap-4`}>
            <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
            <div>
              <p className="text-xs font-medium text-gray-400">{label}</p>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">Account Details</h3>
        <div className="space-y-4">
          {INFO_ITEMS.map(({ icon, label, key }, index) => (
            <div key={key} className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-500 flex-shrink-0 mt-0.5">{icon}</div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5 break-words">{userDetails[key]}</p>
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
                { label: "Full Name", name: "name", type: "text" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Department", name: "department", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={editForm[name]}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [name]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors">
                  <Save size={14} /> Save Changes
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
              <button onClick={() => { setShowPasswordModal(false); setPassError(""); }} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePasswordSave} className="p-6 space-y-4">
              {[
                { label: "Current Password", name: "current" },
                { label: "New Password", name: "next" },
                { label: "Confirm New Password", name: "confirm" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="password"
                    value={passForm[name]}
                    onChange={(e) => setPassForm((prev) => ({ ...prev, [name]: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                  />
                </div>
              ))}
              {passError && <p className="text-xs text-red-500 font-medium">{passError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPassError(""); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors">
                  <Lock size={14} /> Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;