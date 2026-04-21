import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

export default function RoomList() {
  const { rooms, loading } = useApp();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-500 font-medium">กำลังโหลด...</div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="card text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 bg-transparent">
        <p className="text-lg">ยังไม่มีห้องเรียน กรุณาสร้างห้องเรียนก่อน</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="card hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-200 group"
          onClick={() => navigate(`/room/${room._id}`)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                🏫 {room.name}
              </h3>
              {room.description && (
                <p className="text-sm text-gray-500 mt-1">{room.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
              <span className="text-gray-600 font-medium">จำนวนนักเรียน:</span>
              <span className="font-bold text-gray-900">{room.studentCount} คน</span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
              <span className="text-gray-600 font-medium">ยอดออมรวม:</span>
              <span className="font-bold text-green-600">
                {room.totalSaved.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            ดูรายละเอียดนักเรียน <span className="ml-1">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}
