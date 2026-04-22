import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { loadRoomDetails, selectedRoom, deleteRoom } = useApp();
  const [showStudentForm, setShowStudentForm] = useState(false);

  useEffect(() => {
    if (roomId) {
      loadRoomDetails(roomId);
    }
  }, [roomId, loadRoomDetails]);

  if (!selectedRoom) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-500 text-xl font-medium">กำลังโหลดข้อมูลห้องเรียน...</div>
      </div>
    );
  }

  const handleDeleteRoom = () => {
    if (confirm(`ยืนยันลบห้อง "${selectedRoom.name}" และนักเรียนทั้งหมด?`)) {
      try {
        deleteRoom(roomId);
        navigate('/');
      } catch (error) {
        alert('ลบห้องไม่สำเร็จ: ' + error);
      }
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center text-blue-600 hover:text-blue-700 mb-3 font-medium transition-all text-sm md:text-base"
          >
            <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> กลับ Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight break-words">
            🏫 {selectedRoom.name}
          </h1>
          {selectedRoom.description && (
            <p className="text-sm md:text-base text-gray-600 mt-1">{selectedRoom.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="card shadow-sm border border-blue-100 bg-white flex-1 md:flex-none md:min-w-[140px] text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">นักเรียน</p>
            <p className="text-2xl md:text-3xl font-black text-blue-600 mt-1">
              {selectedRoom.studentCount}
            </p>
          </div>
          <div className="card shadow-sm border border-green-100 bg-white flex-1 md:flex-none md:min-w-[160px] text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">ยอดออม</p>
            <p className="text-lg md:text-2xl font-black text-green-600 mt-1 break-words">
              {selectedRoom.totalSaved.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <div className="card border-0 shadow-md">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <span className="text-blue-600">👤</span> รายชื่อนักเรียน
            </h2>
            <StudentList students={selectedRoom.students || []} />
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="sticky top-24">
            {!showStudentForm ? (
              <button
                onClick={() => setShowStudentForm(true)}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg md:rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <span>➕</span> <span className="hidden sm:inline">เพิ่มนักเรียน</span><span className="sm:hidden">เพิ่ม</span>
              </button>
            ) : (
              <div>
                <StudentForm roomId={roomId} onClose={() => setShowStudentForm(false)} />
              </div>
            )}

            <div className="mt-6 md:mt-8 pt-4 md:pt-8 border-t border-gray-100">
              <button
                onClick={handleDeleteRoom}
                className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold transition-all text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 text-sm md:text-base"
              >
                <span>🗑️</span> ลบห้องเรียน
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                * การลบห้องจะลบข้อมูลนักเรียนและรายการออมทั้งหมดถาวร
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
