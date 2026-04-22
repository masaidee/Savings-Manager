import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import RoomList from '../components/RoomList';
import DashboardStats from '../components/DashboardStats';

export default function Dashboard() {
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
        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">🏫 ห้องเรียน</h2>
        <RoomList />
      </div>
    </div>
  );
}
