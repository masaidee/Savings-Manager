import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import StudentList from "../components/StudentList";

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { loadRoomDetails, selectedRoom, deleteRoom } = useApp();

  useEffect(() => {
    if (roomId) {
      loadRoomDetails(roomId);
    }
  }, [roomId, loadRoomDetails]);

  if (!selectedRoom) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-500 text-xl font-medium">
          กำลังโหลดข้อมูลห้องเรียน...
        </div>
      </div>
    );
  }

  const handleDeleteRoom = () => {
    if (confirm(`ยืนยันลบห้อง "${selectedRoom.name}" และนักเรียนทั้งหมด?`)) {
      try {
        deleteRoom(roomId);
        navigate("/");
      } catch (error) {
        alert("ลบห้องไม่สำเร็จ: " + error);
      }
    }
  };

  const handleExportExcel = () => {
    if (!selectedRoom?.students?.length) {
      alert("ไม่มีข้อมูลนักเรียนให้ Export");
      return;
    }

    const headers = [
      "รหัสนักเรียน",
      "ชื่อ-นามสกุล",
      "อายุ",
      "หมายเหตุ",
      "ยอดคงเหลือ (บาท)",
    ];
    const csvRows = selectedRoom.students.map((s) => {
      const name = `"${(s.name || "").replace(/"/g, '""')}"`;
      const notes = `"${(s.notes || "").replace(/"/g, '""')}"`;
      return [
        s.studentNumber || "-",
        name,
        s.age || "-",
        notes,
        s.balance || 0,
      ].join(",");
    });

    // เพิ่มแถวผลรวม
    csvRows.push(
      [
        "",
        "",
        "",
        '"รวมทั้งหมด"',
        selectedRoom.totalSaved || 0,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `ข้อมูลนักเรียน ${selectedRoom.name}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col gap-4 md:gap-6">
        <div>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all text-sm md:text-base"
          >
            <span className="mr-1 group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            กลับ Dashboard
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <span className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm text-2xl md:text-3xl border border-blue-100/50">
                🏫
              </span>
              <span className="break-words">{selectedRoom.name}</span>
            </h1>
            {selectedRoom.description && (
              <p className="text-gray-500 font-medium md:text-lg flex items-center gap-2 ml-2">
                <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                {selectedRoom.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              onClick={() => navigate(`/room/${roomId}/edit`)}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
              title="แก้ไขข้อมูลห้องเรียน"
            >
              ✏️ แก้ไข
            </button>
            <button
              onClick={() => navigate(`/room/${roomId}/add-student`)}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              ➕ เพิ่มนักเรียน
            </button>
            <button
              onClick={handleDeleteRoom}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              🗑️ ลบ
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 transition-colors text-blue-600 rounded-2xl text-2xl md:text-3xl shadow-inner border border-blue-100/50">
              👥
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                นักเรียนทั้งหมด
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {selectedRoom.studentCount}
                </p>
                <span className="text-gray-500 font-semibold">คน</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-green-50 group-hover:bg-green-100 transition-colors text-green-600 rounded-2xl text-2xl md:text-3xl shadow-inner border border-green-100/50">
              💰
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                ยอดเงินออมรวม
              </p>
              <div className="flex items-baseline gap-2 break-words">
                <p className="text-3xl md:text-4xl font-black text-green-600 tracking-tight truncate">
                  {selectedRoom.totalSaved.toLocaleString("th-TH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <span className="text-green-600 font-bold">฿</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3 text-gray-900">
            <span className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-sm border border-gray-100">
              👤
            </span>
            รายชื่อนักเรียน
          </h2>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm border border-green-200 w-full sm:w-auto"
            title="Export เป็น Excel (CSV)"
          >
            <span className="text-lg">📊</span> Export Excel
          </button>
        </div>
        <StudentList students={selectedRoom.students || []} />
      </div>
    </div>
  );
}
