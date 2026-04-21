import { useApp } from '../hooks/useApp';

export default function DashboardStats() {
  const { dashboard } = useApp();

  if (!dashboard) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="card">
        <div className="text-gray-600 text-sm font-medium">จำนวนห้องเรียน</div>
        <div className="text-3xl font-bold text-blue-600 mt-2">
          {dashboard.totalRooms}
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">จำนวนนักเรียน</div>
        <div className="text-3xl font-bold text-indigo-600 mt-2">
          {dashboard.totalStudents}
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">ยอดออมรวม</div>
        <div className="text-3xl font-bold text-green-600 mt-2">
          {dashboard.totalSaved.toFixed(2)} ฿
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">เฉลี่ยต่อคน</div>
        <div className="text-3xl font-bold text-purple-600 mt-2">
          {dashboard.averageSavings.toFixed(2)} ฿
        </div>
      </div>
    </div>
  );
}
