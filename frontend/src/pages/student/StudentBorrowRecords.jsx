import { useState } from "react";
import { Search, BookOpen, Clock, AlertCircle, CheckCircle } from "lucide-react";

const RECORDS = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", borrowDate: "2026-05-20", dueDate: "2026-06-10", status: "Active" },
  { id: 2, title: "Atomic Habits", author: "James Clear", borrowDate: "2026-05-22", dueDate: "2026-06-05", status: "Due Soon" },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", borrowDate: "2026-05-05", dueDate: "2026-05-20", status: "Overdue" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowDate: "2026-04-10", dueDate: "2026-04-25", status: "Returned" },
  { id: 5, title: "Design Patterns", author: "Erich Gamma", borrowDate: "2026-05-28", dueDate: "2026-06-12", status: "Active" },
];

const STATUS_CONFIG = {
  Active: { style: "bg-blue-100 text-blue-700", icon: <CheckCircle size={11} /> },
  "Due Soon": { style: "bg-amber-100 text-amber-700", icon: <Clock size={11} /> },
  Overdue: { style: "bg-red-100 text-red-700", icon: <AlertCircle size={11} /> },
  Returned: { style: "bg-emerald-100 text-emerald-700", icon: <CheckCircle size={11} /> },
};

function StatusBadge({ status }) {
  const { style, icon } = STATUS_CONFIG[status] || {};
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      {icon}{status}
    </span>
  );
}

function StudentBorrowRecords() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = RECORDS.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const active = RECORDS.filter((r) => r.status === "Active").length;
  const dueSoon = RECORDS.filter((r) => r.status === "Due Soon").length;
  const overdue = RECORDS.filter((r) => r.status === "Overdue").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Borrow Records</h1>
        <p className="text-sm text-gray-500 mt-0.5">All books you have borrowed</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Active", value: active, color: "bg-blue-50 text-blue-600 border-blue-100", icon: <BookOpen size={18} /> },
          { label: "Due Soon", value: dueSoon, color: "bg-amber-50 text-amber-600 border-amber-100", icon: <Clock size={18} /> },
          { label: "Overdue", value: overdue, color: "bg-red-50 text-red-600 border-red-100", icon: <AlertCircle size={18} /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`bg-white border rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm ${color.split(" ")[2]}`}>
            <div className={`p-2 rounded-xl flex-shrink-0 ${color.split(" ").slice(0, 2).join(" ")}`}>{icon}</div>
            <div>
              <p className="text-[11px] font-medium text-gray-400">{label}</p>
              <p className="text-lg font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by book name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Due Soon", "Overdue", "Returned"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === s
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3.5 text-left font-semibold">Book</th>
                <th className="px-5 py-3.5 text-left font-semibold">Borrow Date</th>
                <th className="px-5 py-3.5 text-left font-semibold">Due Date</th>
                <th className="px-5 py-3.5 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={15} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{record.title}</p>
                        <p className="text-xs text-gray-400">{record.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{record.borrowDate}</td>
                  <td className={`px-5 py-4 font-semibold ${record.status === "Overdue" ? "text-red-500" : record.status === "Due Soon" ? "text-amber-600" : "text-gray-600"}`}>
                    {record.dueDate}
                  </td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={record.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-400">
              <BookOpen size={36} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No records match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="font-bold text-gray-800 text-sm truncate">{record.title}</p>
                <p className="text-xs text-gray-400">{record.author}</p>
              </div>
              <StatusBadge status={record.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
              <div><span className="font-semibold text-gray-700">Borrowed:</span><br />{record.borrowDate}</div>
              <div className={record.status === "Overdue" ? "text-red-500 font-semibold" : ""}>
                <span className="font-semibold text-gray-700">Due:</span><br />{record.dueDate}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400">
            <BookOpen size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentBorrowRecords;