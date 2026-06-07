import { useEffect, useState } from "react";
import { Search, BookOpen, Filter, ChevronDown, CheckCircle, XCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const ALL_BOOKS = [
  { color: "from-blue-400 to-blue-600" },
  { color: "from-amber-400 to-orange-500" },
  { color: "from-purple-400 to-violet-600" },
  { color: "from-emerald-400 to-teal-600" },
  { color: "from-gray-400 to-gray-600" },
  { color: "from-pink-400 to-rose-600" },
  { color: "from-cyan-400 to-blue-500" },
  { color: "from-lime-400 to-green-600" },
  { color: "from-red-400 to-rose-600" },
  { color: "from-indigo-400 to-indigo-600" },
  { color: "from-teal-400 to-cyan-600" },
  { color: "from-yellow-400 to-amber-600" },
];

const CATEGORIES = ["All", "Science", "Engineering", "Arts", "Commerce", "Others"];

function BookCard({ book, onBorrow, index, borrowedBooks }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Book Cover */}
      <div className={`bg-gradient-to-br ${ALL_BOOKS[index % ALL_BOOKS.length].color} p-6 flex items-center justify-center relative h-36`}>
        <BookOpen size={48} className="text-white opacity-70" />
        <div className="absolute top-3 right-3">
          {book.availableCopies > 0 && book.status === "Available"
            ? <span className="flex items-center gap-1 bg-white/90 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm"><CheckCircle size={10} /> Available</span>
            : <span className="flex items-center gap-1 bg-white/90 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm"><XCircle size={10} /> Borrowed</span>
          }
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{book.author}</p>
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-lg w-fit mb-3">{book.category}</span>
        <div className="mt-auto">
          <p className="text-[11px] text-gray-400 mb-2">{book.available ? `${book.copies} cop${book.copies === 1 ? "y" : "ies"} available` : "Currently unavailable"}</p>
          <button
            onClick={() => onBorrow(book)}
            disabled={!book.available}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${book.available
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-emerald-200"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {borrowedBooks.some((b) => b.bookId._id === book.id) ? "Book Borrowed" : "Borrow Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentBooks() {

  const borrowedBooks = useOutletContext();
  console.log(borrowedBooks)

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availFilter, setAvailFilter] = useState("All");
  const [borrowedId, setBorrowedId] = useState(null);

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const getAllBooks = async () => {
    try {
      const req = await fetch("http://localhost:8001/api/books");
      const res = await req.json();

      if (res.statusCode !== 200) {
        throw new Error(res.message);
      }

      setBooks(res.data);
    } catch (error) {
      setError(error.message);
    }
  }


  useEffect(() => {
    getAllBooks()
  }, [])


  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || b.category === category;
    const matchAvail = availFilter === "All" || (availFilter === "Available" ? b.available : !b.available);
    return matchSearch && matchCat && matchAvail;
  });

  const handleBorrow = (book) => setBorrowedId(book.id);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Books</h1>
        <p className="text-sm text-gray-500 mt-0.5">{ALL_BOOKS.filter((b) => b.available).length} books available to borrow</p>
      </div>

      {/* Success Toast */}
      {borrowedId && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium px-4 py-3 rounded-xl">
          <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
          <span>Borrow request submitted for <strong>{ALL_BOOKS.find((b) => b.id === borrowedId)?.title}</strong>!</span>
          <button onClick={() => setBorrowedId(null)} className="ml-auto text-emerald-500 hover:text-emerald-700"><XCircle size={16} /></button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-8 pr-7 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={availFilter}
              onChange={(e) => setAvailFilter(e.target.value)}
              className="pl-3 pr-7 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer"
            >
              {["All", "Available", "Borrowed"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((book, index) => (
            <BookCard key={book._id} book={book} onBorrow={handleBorrow} index={index} borrowedBooks={borrowedBooks} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <BookOpen size={48} className="mx-auto text-gray-200 mb-3" />
          <h3 className="text-gray-500 font-semibold">No books found</h3>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default StudentBooks;