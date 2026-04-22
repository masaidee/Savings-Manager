import { useNavigate, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/';
  const isAddRoom = location.pathname === '/add-room';

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        {/* Logo */}
        <h1
          className="text-lg md:text-2xl font-black text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <span className="text-2xl md:text-3xl filter drop-shadow-sm">🏫</span>
          <span className="hidden sm:inline tracking-tighter text-sm md:text-base">ระบบออมเงินนักเรียน</span>
          <span className="sm:hidden tracking-tighter text-xs">Keep</span>
        </h1>

        {/* Global Search */}
        <div className="flex-1 flex justify-center w-full max-w-lg">
          <GlobalSearch />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => navigate('/')}
            className={`px-3 md:px-5 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-bold text-xs md:text-sm ${
              isDashboard
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate('/add-room')}
            className={`px-3 md:px-5 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2 whitespace-nowrap ${
              isAddRoom
                ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <span className="text-sm md:text-base">+</span> 
            <span className="hidden sm:inline">เพิ่มห้องเรียน</span>
            <span className="sm:hidden">เพิ่ม</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
