function ReturnRecords() {
  // Dummy returned records data
  const returnRecords = [
    { id: 1, studentName: 'Eve Davis', bookTitle: 'The Great Gatsby', returnDate: '2023-10-28', fineAmount: '$0.00' },
    { id: 2, studentName: 'Frank Miller', bookTitle: '1984', returnDate: '2023-10-29', fineAmount: '$2.50' },
    { id: 3, studentName: 'Grace Lee', bookTitle: 'Clean Code', returnDate: '2023-10-30', fineAmount: '$0.00' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Return Records</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Horizontal scroll container for small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Book Title</th>
                <th className="p-4 font-semibold">Return Date</th>
                <th className="p-4 font-semibold">Fine Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {returnRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{record.studentName}</td>
                  <td className="p-4 text-indigo-600 font-medium">{record.bookTitle}</td>
                  <td className="p-4 text-green-600 font-medium">{record.returnDate}</td>
                  <td className={`p-4 font-bold ${record.fineAmount === '$0.00' ? 'text-gray-500' : 'text-red-500'}`}>
                    {record.fineAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReturnRecords;
