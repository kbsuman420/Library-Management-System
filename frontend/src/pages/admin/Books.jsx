import { useState } from 'react';
import { Search, Plus, BookOpen, Edit2, Trash2, ChevronDown, Filter, X, Save } from 'lucide-react';

const BOOKS = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0-7432-7356-5', copies: 5, available: 3, status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', isbn: '978-0-06-112008-4', copies: 4, available: 0, status: 'Borrowed' },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', isbn: '978-0-452-28423-4', copies: 6, available: 4, status: 'Available' },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', isbn: '978-0-13-235088-4', copies: 3, available: 1, status: 'Available' },
  { id: 5, title: 'Design Patterns', author: 'Erich Gamma', category: 'Programming', isbn: '978-0-20-163361-5', copies: 2, available: 0, status: 'Borrowed' },
  { id: 6, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', isbn: '978-0-13-595705-9', copies: 4, available: 2, status: 'Available' },
  { id: 7, title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', isbn: '978-0-73-521129-2', copies: 5, available: 5, status: 'Available' },
  { id: 8, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', isbn: '978-0-06-231609-7', copies: 3, available: 0, status: 'Borrowed' },
];

const CATEGORIES = ['All', 'Fiction', 'Dystopian', 'Programming', 'Self-Help', 'History'];
const STATUS_OPTS = ['All', 'Available', 'Borrowed'];

const EMPTY_FORM = { title: '', author: '', category: 'Fiction', isbn: '', copies: '', description: '' };

function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}>
      {status}
    </span>
  );
}

function Books() {
  const [books, setBooks] = useState(BOOKS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || b.category === category;
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (book) => {
    setForm({ title: book.title, author: book.author, category: book.category, isbn: book.isbn, copies: book.copies, description: '' });
    setEditId(book.id);
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.isbn || !form.copies) return;
    const copies = parseInt(form.copies) || 1;
    if (editId) {
      setBooks((prev) => prev.map((b) => b.id === editId ? { ...b, ...form, copies, available: copies, status: copies > 0 ? 'Available' : 'Borrowed' } : b));
    } else {
      const newBook = { id: Date.now(), ...form, copies, available: copies, status: 'Available' };
      setBooks((prev) => [newBook, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">{books.length} books total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Add New Book
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-8 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 appearance-none cursor-pointer"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-400 appearance-none cursor-pointer"
            >
              {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3.5 text-left font-semibold">Book</th>
                <th className="px-5 py-3.5 text-left font-semibold">Category</th>
                <th className="px-5 py-3.5 text-left font-semibold">ISBN</th>
                <th className="px-5 py-3.5 text-center font-semibold">Copies</th>
                <th className="px-5 py-3.5 text-center font-semibold">Status</th>
                <th className="px-5 py-3.5 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={17} className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">{book.category}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 font-mono text-xs">{book.isbn}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="font-semibold text-gray-700">{book.available}</span>
                    <span className="text-gray-400 text-xs">/{book.copies}</span>
                  </td>
                  <td className="px-5 py-4 text-center"><StatusBadge status={book.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(book)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No books found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              </div>
              <StatusBadge status={book.status} />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-100 rounded-lg font-medium text-gray-600">{book.category}</span>
              <span>{book.available}/{book.copies} available</span>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => openEdit(book)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-xs font-semibold hover:bg-indigo-50 transition-colors">
                <Edit2 size={13} /> Edit
              </button>
              <button onClick={() => handleDelete(book.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <BookOpen size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No books found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editId ? 'Edit Book' : 'Add New Book'}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[
                { label: 'Title', name: 'title', type: 'text', placeholder: 'Enter book title' },
                { label: 'Author', name: 'author', type: 'text', placeholder: 'Enter author name' },
                { label: 'ISBN', name: 'isbn', type: 'text', placeholder: 'e.g. 978-0-00-000000-0' },
                { label: 'Total Copies', name: 'copies', type: 'number', placeholder: 'Number of copies' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleFormChange}
                    required
                    min={type === 'number' ? 1 : undefined}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  placeholder="Brief description..."
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
                  <Save size={15} />
                  {editId ? 'Update Book' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
