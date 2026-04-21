export default function Navigation({ currentPage, onNavigate }) {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={onNavigate}
        >
          🏫 ระบบออมเงินนักเรียน
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onNavigate}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
