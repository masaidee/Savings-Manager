import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

export default function RoomList() {
  const { rooms, loading } = useApp();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <div className="animate-spin rounded-full h-10 md:h-12 w-10 md:w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-500 font-medium text-sm md:text-base">กำลังโหลด...</div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="card text-center text-gray-500 py-12 md:py-16 border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-base md:text-lg">ยังไม่มีห้องเรียน</p>
        <p className="text-xs md:text-sm mt-1">กรุณาสร้างห้องเรียนใหม่เพื่อเริ่มต้น</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {rooms.map((room) => (
        <div
          key={room._id}
          onClick={() => navigate(`/room/${room._id}`)}
          className="card p-4 md:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 group bg-white"
        >
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 break-words">
                <span className="text-lg md:text-xl flex-shrink-0">🏫</span> <span className="truncate">{room.name}</span>
              </h3>
              {room.description && (
                <p className="text-xs text-gray-500 mt-1 md:mt-2 line-clamp-2">{room.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 md:space-y-2.5 text-xs md:text-sm border-t border-gray-100 pt-3 md:pt-4">
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent p-2 md:p-3 rounded-lg">
              <span className="text-gray-600 font-medium">👥 นักเรียน</span>
              <span className="font-bold text-gray-900 bg-blue-100 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm text-blue-700">
                {room.studentCount}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-transparent p-2 md:p-3 rounded-lg">
              <span className="text-gray-600 font-medium">💰 ยอดออม</span>
              <span className="font-bold text-green-600 text-xs md:text-sm truncate">
                {room.totalSaved.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
              </span>
            </div>
          </div>

          <div className="mt-3 md:mt-4 flex items-center text-blue-600 font-semibold text-xs md:text-sm group-hover:translate-x-1 transition-transform">
            ดูรายละเอียด <span className="ml-1">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}
