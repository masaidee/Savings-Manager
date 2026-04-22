import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import RoomForm from '../components/RoomForm';

export default function EditRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { loadRoomDetails, selectedRoom } = useApp();

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

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right duration-300">
      <div className="space-y-2 md:space-y-3">
        <button
          onClick={() => navigate(`/room/${roomId}`)}
          className="group flex items-center text-blue-600 hover:text-blue-700 mb-3 font-medium transition-all text-sm md:text-base"
        >
          <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> กลับห้องเรียน
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          ✏️ แก้ไขข้อมูลห้องเรียน
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          แก้ไขรายละเอียดของห้อง {selectedRoom.name}
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="card border-0 shadow-md">
          <RoomForm 
            roomId={roomId} 
            initialData={selectedRoom} 
            onClose={() => navigate(`/room/${roomId}`)} 
          />
        </div>
      </div>
    </div>
  );
}
