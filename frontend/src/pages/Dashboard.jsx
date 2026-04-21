import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import RoomList from '../components/RoomList';
import RoomForm from '../components/RoomForm';
import DashboardStats from '../components/DashboardStats';

export default function Dashboard() {
  const { loadRooms, loadDashboard } = useApp();

  useEffect(() => {
    loadRooms();
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard ภาพรวม
        </h1>
        <p className="text-gray-600">
          ติดตามและจัดการการออมเงินของนักเรียน
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">ห้องเรียน</h2>
          <RoomList />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">เพิ่มห้องเรียน</h2>
          <RoomForm />
        </div>
      </div>
    </div>
  );
}
