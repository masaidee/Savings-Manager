import { useNavigate, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/';

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <h1
          className="text-2xl font-black text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <span className="text-3xl filter drop-shadow-sm">🏫</span>
          <span className="hidden sm:inline tracking-tighter">ระบบออมเงินนักเรียน</span>
          <span className="sm:hidden tracking-tighter">Keep App</span>
        </h1>

        {/* Global Search */}
        <div className="flex-1 flex justify-center w-full max-w-lg">
          <GlobalSearch />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className={`px-5 py-2 rounded-xl transition-all duration-300 font-bold text-sm ${
              isDashboard
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
