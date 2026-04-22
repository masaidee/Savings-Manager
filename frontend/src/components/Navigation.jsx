import { useNavigate, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/';
  const isAddRoom = location.pathname === '/add-room';

  return (
    <>
      {/* 🔷 TOP NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
          
          {/* 🔹 Logo */}
          <h1
            className="text-base md:text-2xl font-black text-blue-600 cursor-pointer flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <span className="text-xl md:text-3xl">🏫</span>
            <span className="hidden sm:inline tracking-tight text-sm md:text-base">
              ระบบออมเงินนักเรียน
            </span>
          </h1>

          {/* 🔹 Buttons (Desktop) */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate('/')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                isDashboard
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/add-room')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm flex items-center gap-2 ${
                isAddRoom
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              + เพิ่มห้อง
            </button>
          </div>

          {/* 🔹 Search */}
          <div className="w-full md:flex-1 flex justify-center md:max-w-lg order-3 md:order-none">
            <GlobalSearch />
          </div>
        </div>
      </nav>

      {/* 🔷 BOTTOM NAV (เฉพาะ Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 md:hidden">
        <div className="flex">
          
          <button
            onClick={() => navigate('/')}
            className={`flex-1 py-3 text-xs font-bold flex flex-col items-center ${
              isDashboard ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg">🏠</span>
            หน้าแรก
          </button>

          <button
            onClick={() => navigate('/add-room')}
            className={`flex-1 py-3 text-xs font-bold flex flex-col items-center ${
              isAddRoom ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg">➕</span>
            เพิ่มห้อง
          </button>

        </div>
      </div>
    </>
  );
}