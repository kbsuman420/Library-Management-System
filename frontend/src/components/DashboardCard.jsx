function DashboardCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-300 border border-gray-100">
      {/* Icon Container */}
      <div className={`p-4 rounded-full ${colorClass}`}>
        {icon}
      </div>

      {/* Text Container */}
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

export default DashboardCard;
