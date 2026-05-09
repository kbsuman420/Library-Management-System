import { useState } from 'react';
import { Search, Book } from 'lucide-react';

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addBookForm, setAddBookForm] = useState(true)

  // Dummy book data
  const booksData = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Borrowed' },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'Available' },
    { id: 4, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', status: 'Available' },
    { id: 5, title: 'Design Patterns', author: 'Erich Gamma', category: 'Programming', status: 'Borrowed' },
    { id: 6, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', status: 'Available' },
  ];

  const handleFormOpen = () => {
    setTimeout(() => {
      setAddBookForm((prev) => !prev);
    }, 200)
  }

  return (
    <div className={`space-y-6 ${!addBookForm ? "relative" : ""} `}>
      <h2 className="text-2xl font-bold text-gray-800">Books Inventory</h2>

    <div className='flex flex-row justify-between'>
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
      <button className='h-10 w-35 bg-amber-600 mr-4 rounded-xs cursor-pointer' onClick={handleFormOpen}>Add New Book</button>
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

      <div className={`absolute inset-0 bg-white ${addBookForm ? "hidden" : ""}`}>
      <div className='flex flex-row justify-between m-6'>
        <h2 className='text-xl'>New Book Detaills</h2>
        <div className='h-10 w-10 flex justify-center align-middle'>
          <button className='text-xl cursor-pointer hover:text-3xl' onClick={handleFormOpen}>X</button>
        </div>
      </div>
        <form className='text-xl flex flex-col m-6 md:mx-20'>
          <div className='mt-3'>
            <p className='text-2xl'>Title</p>
            <input type='text' className='w-full mt-1 border-1 p-2 outline-none' placeholder='Enter book title' />
          </div>

          <div className='mt-3'>
            <p className='text-2xl'>Author</p>
            <input type='text' className='w-full mt-1 border-1 p-2 outline-none' placeholder='Enter book Author' />
          </div>

          <div className='mt-3'>
            <p>ISBN</p>
            <input type='text' className='w-full mt-1 border-1 p-2 outline-none' placeholder='Enter book title' />
          </div>
          
          <div className='mt-3'>
            <p>TotalCopies</p>
            <input type="number" className='w-full mt-1 border-1 p-2 outline-none' placeholder='Enter book Author' />
          </div>

          <button className="relative mt-5 inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group">
            <span className="absolute bottom-0 left-0 h-full -ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-auto h-full opacity-100 object-stretch"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                ></path>
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-12 h-full -mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="object-cover w-full h-full"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                ></path>
              </svg>
            </span>
            <span
              className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
            ></span>
            <span className="relative font-semibold text-xl">Add Book !</span>
          </button>

        </form>
      </div>

    </div>

  );
}

export default Books;
