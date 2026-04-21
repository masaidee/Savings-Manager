import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/';

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <span className="text-3xl">🏫</span>
          <span className="hidden sm:inline">ระบบออมเงินนักเรียน</span>
          <span className="sm:hidden">Keep</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              isDashboard
                ? 'bg-blue-600 text-white shadow-md'
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
