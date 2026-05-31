import { BookOpen, Clock, BookCheck, AlertCircle, ArrowUpRight, Zap, Search, RotateCcw } from "lucide-react";

const STATS = [
  { label: "Total Borrowed", value: 24, icon: <BookOpen size={20} />, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100", change: "+3 this month" },
  { label: "Currently Borrowed", value: 3, icon: <Clock size={20} />, color: "bg-blue-50 text-blue-600", border: "border-blue-100", change: "Due this week" },
  { label: "Returned Books", value: 19, icon: <BookCheck size={20} />, color: "bg-violet-50 text-violet-600", border: "border-violet-100", change: "All on time" },
  { label: "Pending Returns", value: 2, icon: <AlertCircle size={20} />, color: "bg-amber-50 text-amber-600", border: "border-amber-100", change: "Action needed" },
];

const RECENT_BORROWED = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", dueDate: "Jun 10, 2026", status: "Active", cover: "bg-blue-400" },
  { id: 2, title: "Atomic Habits", author: "James Clear", dueDate: "Jun 5, 2026", status: "Due Soon", cover: "bg-amber-400" },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", dueDate: "May 28, 2026", status: "Overdue", cover: "bg-red-400" },
];

const DUE_SOON = [
  { id: 1, title: "Atomic Habits", daysLeft: 5, cover: "bg-amber-400" },
  { id: 2, title: "Clean Code", daysLeft: 10, cover: "bg-blue-400" },
];

const QUICK_ACTIONS = [
  { label: "Browse Books", icon: <Search size={18} />, to: "/student-dashboard/books", color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
  { label: "My Borrows", icon: <BookOpen size={18} />, to: "/student-dashboard/borrow-records", color: "bg-blue-600 hover:bg-blue-700 text-white" },
  { label: "Return History", icon: <RotateCcw size={18} />, to: "/student-dashboard/return-records", color: "bg-violet-600 hover:bg-violet-700 text-white" },
  { label: "Quick Borrow", icon: <Zap size={18} />, to: "/student-dashboard/books", color: "bg-amber-500 hover:bg-amber-600 text-white" },
];

const STATUS_STYLE = {
  Active: "bg-blue-100 text-blue-700",
  "Due Soon": "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
};

function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative">
          <p className="text-emerald-200 text-sm font-medium mb-1">Good afternoon 👋</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">Welcome back, Alex!</h1>
          <p className="text-emerald-200 text-sm">You have <span className="text-white font-bold">2 books</span> due soon. Don't forget to return them.</p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-20 hidden sm:block">
          <BookOpen size={96} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.border} shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200`}>
            <div className={`p-2.5 rounded-xl ${s.color} flex-shrink-0`}>{s.icon}</div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400 truncate">{s.label}</p>
              <p className="text-xl font-extrabold text-gray-900 leading-tight">{s.value}</p>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight size={10} />{s.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Borrowed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recently Borrowed</h2>
            <a href="/student-dashboard/borrow-records" className="text-xs text-emerald-600 font-semibold hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_BORROWED.map((book) => (
              <div key={book.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-14 rounded-lg ${book.cover} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <BookOpen size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{book.title}</p>
                  <p className="text-xs text-gray-500 truncate">{book.author}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Due: {book.dueDate}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${STATUS_STYLE[book.status]}`}>
                  {book.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.label}
                  href={action.to}
                  className={`flex flex-col items-center justify-center gap-1.5 px-2 py-4 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm ${action.color}`}
                >
                  {action.icon}
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          {/* Due Soon */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              Due Soon
            </h2>
            <div className="space-y-3">
              {DUE_SOON.map((book) => (
                <div key={book.id} className="flex items-center gap-3">
                  <div className={`w-8 h-10 rounded-lg ${book.cover} flex items-center justify-center flex-shrink-0`}>
                    <BookOpen size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{book.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 bg-amber-100 rounded-full h-1.5">
                        <div
                          className="bg-amber-400 h-1.5 rounded-full"
                          style={{ width: `${Math.max(10, 100 - book.daysLeft * 7)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 flex-shrink-0">{book.daysLeft}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;