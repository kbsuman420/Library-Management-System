import { useState } from 'react';
import { Search, Book } from 'lucide-react';

function Books() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy book data
  const booksData = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Borrowed' },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'Available' },
    { id: 4, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', status: 'Available' },
    { id: 5, title: 'Design Patterns', author: 'Erich Gamma', category: 'Programming', status: 'Borrowed' },
    { id: 6, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', status: 'Available' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Books Inventory</h2>

      {/* Search Bar */}
      <div className="flex items-center bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <Search className="text-gray-400 ml-2 mr-2" size={20} />
        <input 
          type="text" 
          placeholder="Search books by title or author..." 
          className="w-full p-2 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Books Grid/Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {booksData.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Book size={24} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {book.status}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md mb-4">
                {book.category}
              </span>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <button 
                disabled={book.status !== 'Available'}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  book.status === 'Available' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Borrow Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
