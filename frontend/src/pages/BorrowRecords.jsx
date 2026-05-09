function BorrowRecords() {
  // Dummy borrow records data
  const borrowRecords = [
    { id: 1, studentName: 'Alice Johnson', bookTitle: 'To Kill a Mockingbird', borrowDate: '2023-10-20', dueDate: '2023-11-05' },
    { id: 2, studentName: 'Bob Smith', bookTitle: 'Design Patterns', borrowDate: '2023-10-22', dueDate: '2023-11-07' },
    { id: 3, studentName: 'Charlie Brown', bookTitle: 'Clean Architecture', borrowDate: '2023-10-25', dueDate: '2023-11-10' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Borrow Records</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Horizontal scroll container for small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Book Title</th>
                <th className="p-4 font-semibold">Borrow Date</th>
                <th className="p-4 font-semibold">Due Date</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {borrowRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{record.studentName}</td>
                  <td className="p-4 text-indigo-600 font-medium">{record.bookTitle}</td>
                  <td className="p-4">{record.borrowDate}</td>
                  <td className="p-4 text-orange-600 font-medium">{record.dueDate}</td>
                  <td className="p-4 text-center">
                    <button className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                      Mark Returned
                    </button>
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

export default BorrowRecords;
