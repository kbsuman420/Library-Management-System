import { BookOpen, BookCheck, Clock, Users, TrendingUp, ArrowUpRight, Zap, Plus, RefreshCw, BarChart2 } from 'lucide-react';

const stats = [
  { title: 'Total Books', value: '3,842', change: '+12%', icon: <BookOpen size={22} />, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
  { title: 'Borrowed Books', value: '1,245', change: '+5%', icon: <Clock size={22} />, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  { title: 'Returned Books', value: '982', change: '+8%', icon: <BookCheck size={22} />, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
  { title: 'Registered Students', value: '528', change: '+3%', icon: <Users size={22} />, color: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
];

const recentActivity = [
  { id: 1, type: 'borrow', student: 'Alice Johnson', book: 'Clean Code', time: '2 mins ago', avatar: 'AJ' },
  { id: 2, type: 'return', student: 'Bob Smith', book: 'The Great Gatsby', time: '18 mins ago', avatar: 'BS' },
  { id: 3, type: 'borrow', student: 'Carol White', book: 'Design Patterns', time: '1 hr ago', avatar: 'CW' },
  { id: 4, type: 'return', student: 'David Lee', book: '1984', time: '3 hrs ago', avatar: 'DL' },
  { id: 5, type: 'borrow', student: 'Eva Martinez', book: 'Pragmatic Programmer', time: '5 hrs ago', avatar: 'EM' },
];

const topBooks = [
  { title: 'Clean Code', author: 'Robert C. Martin', borrows: 42, pct: 84 },
  { title: 'Design Patterns', author: 'Erich Gamma', borrows: 38, pct: 76 },
  { title: '1984', author: 'George Orwell', borrows: 35, pct: 70 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', borrows: 29, pct: 58 },
];

const quickActions = [
  { label: 'Add New Book', icon: <Plus size={18} />, color: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
  { label: 'Record Return', icon: <RefreshCw size={18} />, color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
  { label: 'View Reports', icon: <BarChart2 size={18} />, color: 'bg-violet-600 hover:bg-violet-700 text-white' },
  { label: 'Quick Borrow', icon: <Zap size={18} />, color: 'bg-amber-500 hover:bg-amber-600 text-white' },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm w-fit">
          <TrendingUp size={15} className="text-indigo-500" />
          <span>May 31, 2026</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200 group`}
          >
            <div className={`p-3 rounded-xl ${stat.color} flex-shrink-0`}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 truncate">{stat.title}</p>
              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{stat.value}</h3>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight size={12} />
                {stat.change} this month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-base">Recent Activity</h2>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">View all</button>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.type === 'borrow' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.student}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.type === 'borrow' ? 'Borrowed' : 'Returned'}&nbsp;
                    <span className="font-medium text-gray-700">"{item.book}"</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.type === 'borrow' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {item.type === 'borrow' ? 'Borrowed' : 'Returned'}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Panel: Quick Actions + Top Books */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 text-base mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={`flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${action.color}`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Borrowed Books */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
            <h2 className="font-bold text-gray-800 text-base mb-4">Top Borrowed Books</h2>
            <div className="space-y-4">
              {topBooks.map((book) => (
                <div key={book.title}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{book.title}</p>
                      <p className="text-xs text-gray-500 truncate">{book.author}</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 ml-2 flex-shrink-0">{book.borrows}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${book.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
