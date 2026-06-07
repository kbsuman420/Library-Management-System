import { useState } from "react";
import { Search, BookCheck, DollarSign, CheckCircle, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const RECORDS = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowDate: "2026-04-10", returnDate: "2026-04-24", dueDate: "2026-04-25", fine: 0, status: "On Time" },
  { id: 2, title: "1984", author: "George Orwell", borrowDate: "2026-03-15", returnDate: "2026-04-02", dueDate: "2026-03-30", fine: 3.00, status: "Late" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", borrowDate: "2026-02-20", returnDate: "2026-03-06", dueDate: "2026-03-07", fine: 0, status: "On Time" },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", borrowDate: "2026-01-10", returnDate: "2026-01-30", dueDate: "2026-01-25", fine: 5.00, status: "Late" },
];

const STATUS_STYLE = {
  "On Time": "bg-emerald-100 text-emerald-700",
  Late: "bg-red-100 text-red-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[status]}`}>
      {status === "On Time" ? <CheckCircle size={11} /> : <Clock size={11} />}
      {status}
    </span>
  );
}

function StudentReturnRecords() {

  const borrowedBooks = useOutletContext()
  const returnBooks = borrowedBooks.filter((r) => r.status === "Returned");

  const [search, setSearch] = useState("");

  const filtered = returnBooks.filter((r) =>
    r.bookId.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalReturned = returnBooks.length;
  const onTime = returnBooks.filter((r) => r.status === "On Time").length;
  const totalFines = returnBooks.reduce((sum, r) => sum + r.fine, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Return History</h1>
        <p className="text-sm text-gray-500 mt-0.5">All books you have returned</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Returned", value: totalReturned, icon: <BookCheck size={18} />, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
          { label: "Returned On Time", value: onTime, icon: <CheckCircle size={18} />, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
          { label: "Total Fines Paid", value: `$${totalFines.toFixed(2)}`, icon: <DollarSign size={18} />, color: "bg-red-50 text-red-500", border: "border-red-100" },
        ].map(({ label, value, icon, color, border }) => (
          <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-3`}>
            <div className={`p-2 rounded-xl flex-shrink-0 ${color}`}>{icon}</div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400 truncate">{label}</p>
              <p className="text-lg font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <BookCheck size={52} className="mx-auto text-gray-200 mb-3" />
          <h3 className="text-gray-500 font-semibold text-lg">No return records yet</h3>
          <p className="text-gray-400 text-sm mt-1">Books you return will appear here</p>
        </div>
      )}

      {/* Desktop Table */}
      {filtered.length > 0 && (
        <>
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-3.5 text-left font-semibold">Book</th>
                    <th className="px-5 py-3.5 text-left font-semibold">Borrow Date</th>
                    <th className="px-5 py-3.5 text-left font-semibold">Return Date</th>
                    <th className="px-5 py-3.5 text-center font-semibold">Fine</th>
                    <th className="px-5 py-3.5 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">{record.bookId.title}</p>
                        <p className="text-xs text-gray-400">{record.bookId.author}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{record.borrowDate}</td>
                      <td className="px-5 py-4 text-emerald-600 font-medium">{record.returnDate}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`font-bold text-sm ${record.fine > 0 ? "text-red-500" : "text-gray-400"}`}>
                          {record.fine > 0 ? `$${record.fine.toFixed(2)}` : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center"><StatusBadge status={record.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{record.title}</p>
                    <p className="text-xs text-gray-400">{record.author}</p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
                  <div><span className="font-semibold text-gray-700">Borrowed:</span><br />{record.borrowDate}</div>
                  <div><span className="font-semibold text-gray-700">Returned:</span><br />{record.returnDate}</div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-700">Fine: </span>
                    <span className={record.fine > 0 ? "text-red-500 font-bold" : "text-gray-400"}>
                      {record.fine > 0 ? `$${record.fine.toFixed(2)}` : "No fine"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StudentReturnRecords;