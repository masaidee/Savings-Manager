import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import GlobalSearch from './GlobalSearch';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isDashboard = location.pathname === '/';
  const isAddRoom = location.pathname === '/add-room';

  return (
    <>
      {/* 🔷 TOP NAV */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/* 🔹 ROW: Hamburger + Search */}
          <div className="flex items-center gap-2 w-full">

            {/* 🍔 Hamburger (mobile only) */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-2xl px-2 py-1 rounded-lg active:scale-90"
            >
              ☰
            </button>

            {/* Logo (desktop only) */}
            <h1
              onClick={() => navigate('/')}
              className="hidden md:flex text-2xl font-black text-blue-600 cursor-pointer items-center gap-2"
            >
              🏫 ระบบออมเงินนักเรียน
            </h1>

            {/* Search */}
            <div className="flex-1 min-w-0">
              <GlobalSearch />
            </div>
          </div>

          {/* 🔹 Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate('/')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm ${
                isDashboard
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>

          </div>
        </div>
      </nav>

      {/* 🔷 MOBILE MENU (Overlay) */}
      {open && (
        <>
          {/* 🔸 Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setOpen(false)}
          />

          {/* 🔸 Drawer */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg p-4 flex flex-col gap-4 animate-slide-in">
            
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">เมนู</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Menu Items */}
            <button
              onClick={() => {
                navigate('/');
                setOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg ${
                isDashboard
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              🏠 หน้าแรก
            </button>

          </div>
        </>
      )}


    </>
  );
}