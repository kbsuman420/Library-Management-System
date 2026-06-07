import { useEffect, useState } from 'react';
import { Search, Clock, BookOpen, AlertCircle, CheckCircle, Filter } from 'lucide-react';

const RECORDS = [
  { id: 1, student: 'Alice Johnson', studentId: 'STU001', book: 'Clean Code', borrowDate: '2026-05-10', dueDate: '2026-05-25', status: 'Overdue' },
  { id: 2, student: 'Bob Smith', studentId: 'STU002', book: 'Design Patterns', borrowDate: '2026-05-18', dueDate: '2026-06-02', status: 'Active' },
  { id: 3, student: 'Carol White', studentId: 'STU003', book: 'The Great Gatsby', borrowDate: '2026-05-20', dueDate: '2026-06-04', status: 'Active' },
  { id: 4, student: 'David Lee', studentId: 'STU004', book: '1984', borrowDate: '2026-05-05', dueDate: '2026-05-20', status: 'Overdue' },
  { id: 5, student: 'Eva Martinez', studentId: 'STU005', book: 'Pragmatic Programmer', borrowDate: '2026-05-22', dueDate: '2026-06-06', status: 'Active' },
  { id: 6, student: 'Frank Wilson', studentId: 'STU006', book: 'Atomic Habits', borrowDate: '2026-05-28', dueDate: '2026-06-12', status: 'Active' },
  { id: 7, student: 'Grace Kim', studentId: 'STU007', book: 'Sapiens', borrowDate: '2026-05-01', dueDate: '2026-05-16', status: 'Overdue' },
];

const STATUS_COLORS = {
  Active: 'bg-blue-100 text-blue-700',
  Overdue: 'bg-red-100 text-red-700',
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {status === 'Overdue' ? <AlertCircle size={11} /> : <CheckCircle size={11} />}
      {status}
    </span>
  );
}

function BorrowRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState("");

  const filtered = records.filter((r) => {
    const matchSearch = r.fullName.toLowerCase().includes(search.toLowerCase()) || r.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleMarkReturned = async (id) => {
    console.log(id)
    if (!confirm("Are You sure to mark this book as returned")) {
      return;
    }
    try {
      const result = await fetch(`http://localhost:8001/api/borrow/return/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await result.json();
      if (data.statusCode !== 200) {
        throw new Error(data.message)
      }
      console.log(data.data);
      fetchBorrows();
    } catch (error) {
      console.log(error.me)
    }
  }

  const total = records.length;
  const active = records.filter((r) => r.status === 'Active').length;
  const overdue = records.filter((r) => r.status === 'Overdue').length;

  const fetchBorrows = async () => {
    try {
      const result = await fetch("http://localhost:8001/api/borrow/allBorrows");
      const data = await result.json();
      if (data.statusCode !== 200) {
        throw new Error(data.message);
      }
      const borrowsArray = data.data.map((borrow) => {

        const { fullName, student_id } = borrow.userId
        const { title } = borrow.bookId
        const { _id, borrowDate, dueDate, status } = borrow;

        let newStatus = status;

        if (dueDate < Date.now() && newStatus === "Active" && status !== "RETURNED") {
          newStatus = "Overdue"
          console.log(newStatus)
        }

        console.log(dueDate, Date.now());


        const formattedBorrowDate = new Date(Number(borrowDate)).toLocaleDateString();
        const formattedDueDate = new Date(Number(dueDate)).toLocaleDateString();
        console.log({ _id, fullName, student_id, title, formattedBorrowDate, formattedDueDate, newStatus })
        if (status === "RETURNED") {
          return;
        }
        return { _id, fullName, student_id, title, formattedBorrowDate, formattedDueDate, status }
      })

      const BorrowRecords = borrowsArray.filter((borrow) => borrow.status !== "Returned");

      setRecords(BorrowRecords);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchBorrows()
  }, [])
  console.log(records.length)
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Borrow Records</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track all active and overdue borrowings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Borrowed', value: total, icon: <BookOpen size={20} />, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
          { label: 'Active Loans', value: active, icon: <Clock size={20} />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
          { label: 'Overdue', value: overdue, icon: <AlertCircle size={20} />, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
        ].map(({ label, value, icon, color, border }) => (
          <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-4 flex items-center gap-3`}>
            <div className={`p-2.5 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
            <div>
              <p className="text-xs font-medium text-gray-500">{label}</p>
              <p className="text-xl font-extrabold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or book..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 appearance-none cursor-pointer"
          >
            {['All', 'Active', 'Overdue'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3.5 text-left font-semibold">Student</th>
                <th className="px-5 py-3.5 text-left font-semibold">Book</th>
                <th className="px-5 py-3.5 text-left font-semibold">Borrow Date</th>
                <th className="px-5 py-3.5 text-left font-semibold">Due Date</th>
                <th className="px-5 py-3.5 text-center font-semibold">Status</th>
                <th className="px-5 py-3.5 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">{record.fullName}</p>
                    <p className="text-xs text-gray-400">{record.student_id}</p>
                  </td>
                  <td className="px-5 py-4 font-medium text-indigo-700">{record.title}</td>
                  <td className="px-5 py-4 text-gray-600">{record.formattedBorrowDate}</td>
                  <td className={`px-5 py-4 font-semibold ${record.status === 'Overdue' ? 'text-red-500' : 'text-gray-600'}`}>
                    {record.formattedDueDate}
                  </td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={record.status} /></td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleMarkReturned(record._id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors active:scale-95"
                    >
                      Mark Returned
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-400">
              <BookOpen size={36} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No records found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-gray-800 text-sm">{record.student}</p>
                <p className="text-xs text-gray-400">{record.studentId}</p>
              </div>
              <StatusBadge status={record.status} />
            </div>
            <p className="text-sm font-medium text-indigo-700 mb-3">📖 {record.book}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
              <div><span className="font-semibold text-gray-700">Borrowed:</span> {record.borrowDate}</div>
              <div className={record.status === 'Overdue' ? 'text-red-500 font-semibold' : ''}>
                <span className="font-semibold text-gray-700">Due:</span> {record.dueDate}
              </div>
            </div>
            <button
              onClick={() => handleMarkReturned(record.id)}
              className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
            >
              Mark as Returned
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <BookOpen size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BorrowRecords;
