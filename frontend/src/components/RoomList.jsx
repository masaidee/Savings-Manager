import { useApp } from '../hooks/useApp';

export default function RoomList({ onSelectRoom }) {
  const { rooms, loading } = useApp();

  if (loading) {
    return <div className="text-center py-8">กำลังโหลด...</div>;
  }

  if (rooms.length === 0) {
    return (
      <div className="card text-center text-gray-500 py-12">
        <p>ยังไม่มีห้องเรียน กรุณาสร้างห้องเรียนก่อน</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectRoom(room._id)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">🏫 {room.name}</h3>
              {room.description && (
                <p className="text-sm text-gray-500">{room.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">จำนวนนักเรียน:</span>
              <span className="font-medium">{room.studentCount} คน</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ยอดออมรวม:</span>
              <span className="font-medium text-green-600">
                {room.totalSaved.toFixed(2)} ฿
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ดูรายละเอียด →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
