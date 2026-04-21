import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';

export default function RoomDetail({ roomId, onBack, onSelectStudent }) {
  const { loadRoomDetails, selectedRoom, deleteRoom } = useApp();

  useEffect(() => {
    loadRoomDetails(roomId);
  }, [roomId]);

  if (!selectedRoom) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleDeleteRoom = () => {
    if (confirm(`ยืนยันลบห้อง "${selectedRoom.name}" และนักเรียนทั้งหมด?`)) {
      try {
        deleteRoom(roomId);
        onBack();
      } catch (error) {
        alert('ลบห้องไม่สำเร็จ: ' + error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            ← กลับ Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            🏫 {selectedRoom.name}
          </h1>
          {selectedRoom.description && (
            <p className="text-gray-600 text-lg">{selectedRoom.description}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 text-center">
            <p className="text-gray-600 text-sm">นักเรียน</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {selectedRoom.studentCount}
            </p>
          </div>
          <div className="card bg-gradient-to-br from-green-50 to-green-100 text-center">
            <p className="text-gray-600 text-sm">ยอดออมรวม</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {selectedRoom.totalSaved.toFixed(2)} ฿
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">รายชื่อนักเรียน</h2>
            <StudentList
              students={selectedRoom.students || []}
              onSelectStudent={onSelectStudent}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">เพิ่มนักเรียน</h2>
            <StudentForm roomId={roomId} />
          </div>

          <button
            onClick={handleDeleteRoom}
            className="w-full py-2 rounded-lg font-medium transition-colors text-white bg-red-600 hover:bg-red-700"
          >
            🗑️ ลบห้องเรียนนี้
          </button>
        </div>
      </div>
    </div>
  );
}
