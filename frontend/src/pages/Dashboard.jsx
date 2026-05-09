import DashboardCard from '../components/DashboardCard';
import { BookOpen, BookCheck, Clock, DollarSign } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardCard 
          title="Total Borrowed Books" 
          value="1,245" 
          icon={<BookOpen size={24} />} 
          colorClass="bg-blue-100 text-blue-600" 
        />
        <DashboardCard 
          title="Returned Books" 
          value="982" 
          icon={<BookCheck size={24} />} 
          colorClass="bg-green-100 text-green-600" 
        />
        <DashboardCard 
          title="Pending Returns" 
          value="263" 
          icon={<Clock size={24} />} 
          colorClass="bg-orange-100 text-orange-600" 
        />
        <DashboardCard 
          title="Fine Amount Collected" 
          value="$450" 
          icon={<DollarSign size={24} />} 
          colorClass="bg-red-100 text-red-600" 
        />
      </div>

      {/* Placeholder for future charts or recent activity */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-sm">No recent activity to show.</p>
      </div>
    </div>
  );
}

export default Dashboard;
