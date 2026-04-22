import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import RoomList from '../components/RoomList';
import DashboardStats from '../components/DashboardStats';

export default function Dashboard() {
  const navigate = useNavigate();
  const { loadRooms, loadDashboard } = useApp();
  useEffect(() => {
    loadRooms();
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          Dashboard ภาพรวม
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          ติดตามและจัดการการออมเงินของนักเรียน
        </p>
      </div>

      <DashboardStats />

<div className="card border-0 shadow-md">

  {/* 🔷 Header */}
  <div className="flex items-center justify-between mb-4 md:mb-6">
    
    <h2 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center gap-2">
      <span>🏫</span>
      ห้องเรียน
    </h2>

    <button
      onClick={() => navigate('/add-room')}
      className="px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm bg-green-600 text-white hover:bg-green-700 transition active:scale-95 whitespace-nowrap"
    >
      + เพิ่มห้อง
    </button>

  </div>

  {/* 🔷 List */}
  <RoomList />

</div>
    </div>
  );
}
