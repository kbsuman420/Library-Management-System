import { useState } from 'react';
import { Search, CheckCircle, DollarSign, BookCheck, TrendingDown } from 'lucide-react';

const RECORDS = [
  { id: 1, student: 'Eve Davis', studentId: 'STU008', book: 'The Great Gatsby', returnDate: '2026-05-28', dueDate: '2026-05-25', fine: 3.00, status: 'Fine Paid' },
  { id: 2, student: 'Frank Miller', studentId: 'STU009', book: '1984', returnDate: '2026-05-29', dueDate: '2026-05-30', fine: 0, status: 'On Time' },
  { id: 3, student: 'Grace Lee', studentId: 'STU010', book: 'Clean Code', returnDate: '2026-05-27', dueDate: '2026-05-20', fine: 7.50, status: 'Fine Paid' },
  { id: 4, student: 'Henry Clark', studentId: 'STU011', book: 'Atomic Habits', returnDate: '2026-05-30', dueDate: '2026-05-30', fine: 0, status: 'On Time' },
  { id: 5, student: 'Isla Young', studentId: 'STU012', book: 'Design Patterns', returnDate: '2026-05-31', dueDate: '2026-05-25', fine: 6.00, status: 'Fine Pending' },
  { id: 6, student: 'Jack Turner', studentId: 'STU013', book: 'Sapiens', returnDate: '2026-05-26', dueDate: '2026-05-24', fine: 2.50, status: 'Fine Pending' },
];

const STATUS_STYLE = {
  'On Time': 'bg-emerald-100 text-emerald-700',
  'Fine Paid': 'bg-blue-100 text-blue-700',
  'Fine Pending': 'bg-amber-100 text-amber-700',
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[status]}`}>
      {status}
    </span>
  );
}

function ReturnRecords() {
  const [records, setRecords] = useState(RECORDS);
  const [search, setSearch] = useState('');

  const filtered = records.filter((r) =>
    r.student.toLowerCase().includes(search.toLowerCase()) || r.book.toLowerCase().includes(search.toLowerCase())
  );

  const totalReturned = records.length;
  const onTime = records.filter((r) => r.status === 'On Time').length;
  const totalFines = records.reduce((acc, r) => acc + r.fine, 0);
  const pendingFines = records.filter((r) => r.status === 'Fine Pending').reduce((acc, r) => acc + r.fine, 0);

  const handleMarkPaid = (id) =>
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Fine Paid' } : r));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Return Records</h1>
        <p className="text-sm text-gray-500 mt-0.5">Summary of all book returns and fines</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Returns', value: totalReturned, icon: <BookCheck size={20} />, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
          { label: 'On Time Returns', value: onTime, icon: <CheckCircle size={20} />, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
          { label: 'Fines Collected', value: `$${totalFines.toFixed(2)}`, icon: <DollarSign size={20} />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
          { label: 'Pending Fines', value: `$${pendingFines.toFixed(2)}`, icon: <TrendingDown size={20} />, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
        ].map(({ label, value, icon, color, border }) => (
          <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-4 flex items-center gap-3`}>
            <div className={`p-2.5 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 truncate">{label}</p>
              <p className="text-lg font-extrabold text-gray-900 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search student or book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3.5 text-left font-semibold">Student</th>
                <th className="px-5 py-3.5 text-left font-semibold">Book</th>
                <th className="px-5 py-3.5 text-left font-semibold">Return Date</th>
                <th className="px-5 py-3.5 text-left font-semibold">Due Date</th>
                <th className="px-5 py-3.5 text-center font-semibold">Fine</th>
                <th className="px-5 py-3.5 text-center font-semibold">Status</th>
                <th className="px-5 py-3.5 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">{record.student}</p>
                    <p className="text-xs text-gray-400">{record.studentId}</p>
                  </td>
                  <td className="px-5 py-4 font-medium text-indigo-700">{record.book}</td>
                  <td className="px-5 py-4 text-emerald-600 font-medium">{record.returnDate}</td>
                  <td className="px-5 py-4 text-gray-600">{record.dueDate}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`font-bold text-sm ${record.fine > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {record.fine > 0 ? `$${record.fine.toFixed(2)}` : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={record.status} /></td>
                  <td className="px-5 py-4 text-center">
                    {record.status === 'Fine Pending' ? (
                      <button
                        onClick={() => handleMarkPaid(record.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors active:scale-95"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-400">
              <BookCheck size={36} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No records found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-bold text-gray-800 text-sm">{record.student}</p>
                <p className="text-xs text-gray-400">{record.studentId}</p>
              </div>
              <StatusBadge status={record.status} />
            </div>
            <p className="text-sm font-medium text-indigo-700 mb-3">📖 {record.book}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
              <div><span className="font-semibold text-gray-700">Returned:</span> {record.returnDate}</div>
              <div><span className="font-semibold text-gray-700">Due:</span> {record.dueDate}</div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Fine: </span>
                <span className={record.fine > 0 ? 'text-red-500 font-bold' : 'text-gray-400'}>
                  {record.fine > 0 ? `$${record.fine.toFixed(2)}` : 'No fine'}
                </span>
              </div>
            </div>
            {record.status === 'Fine Pending' && (
              <button
                onClick={() => handleMarkPaid(record.id)}
                className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
              >
                Mark Fine as Paid
              </button>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <BookCheck size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnRecords;
