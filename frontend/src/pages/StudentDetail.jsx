import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import SavingForm from '../components/SavingForm';

export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { 
    loadStudentDetails, 
    selectedStudent, 
    savings, 
    deleteSaving, 
    deleteStudent 
  } = useApp();

  useEffect(() => {
    if (studentId) {
      loadStudentDetails(studentId);
    }
  }, [studentId, loadStudentDetails]);

  if (!selectedStudent) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-500 text-xl font-medium">กำลังโหลดข้อมูลนักเรียน...</div>
      </div>
    );
  }

  const handleDeleteSaving = (savingId) => {
    if (confirm('ยืนยันลบรายการนี้?')) {
      try {
        deleteSaving(savingId);
      } catch (error) {
        alert('ลบไม่สำเร็จ: ' + error);
      }
    }
  };

  const handleDeleteStudent = () => {
    if (confirm(`ยืนยันลบนักเรียน "${selectedStudent.name}" และรายการออมทั้งหมด?`)) {
      try {
        const roomId = selectedStudent.roomId;
        deleteStudent(studentId);
        navigate(`/room/${roomId}`);
      } catch (error) {
        alert('ลบนักเรียนไม่สำเร็จ: ' + error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button
            onClick={() => navigate(`/room/${selectedStudent.roomId}`)}
            className="group flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium transition-all"
          >
            <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> กลับห้องเรียน
          </button>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-blue-50 rounded-2xl text-2xl md:text-3xl">👤</span>
            {selectedStudent.name}
            <button
              onClick={() => navigate(`/student/${studentId}/edit`)}
              className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
              title="แก้ไขข้อมูลนักเรียน"
            >
              <span className="text-xl md:text-2xl">✏️</span>
            </button>
          </h1>
          <div className="flex items-center gap-3 mt-3">
            {selectedStudent.age > 0 && (
              <span className="text-gray-500 font-medium">อายุ {selectedStudent.age} ปี</span>
            )}
            <div className="h-4 w-px bg-gray-200"></div>
            <span className="badge bg-blue-600 text-white shadow-sm font-bold">
              🏫 {selectedStudent.roomName}
            </span>
          </div>
        </div>
        
        <div className="card bg-white shadow-lg border-b-4 border-blue-600 px-6 py-4 md:px-10 md:py-6 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">ยอดเงินคงเหลือ</p>
          <p className="text-3xl md:text-5xl font-black text-blue-600">
            {selectedStudent.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })} <span className="text-xl md:text-2xl ml-1">฿</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card border-0 shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-indigo-600">📝</span> ประวัติการออม
            </h2>

            {savings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                <span className="text-5xl mb-4">📭</span>
                <p className="text-lg">ยังไม่มีรายการออมเงิน</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savings.map((saving) => (
                  <div
                    key={saving._id}
                    className="flex items-center justify-between p-4 md:p-5 bg-white border border-gray-50 rounded-2xl hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            saving.type === 'deposit'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {saving.type === 'deposit' ? '💰 ฝากเงิน' : '💸 ถอนเงิน'}
                        </span>
                        <span className="text-xl font-bold text-gray-800">
                          {saving.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                        </span>
                      </div>
                      {saving.notes && (
                        <p className="text-sm text-gray-600 mb-1">
                          {saving.notes}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                        <span>🗓️ {new Date(saving.date).toLocaleDateString('th-TH')}</span>
                        <span>•</span>
                        <span>🕒 {new Date(saving.date).toLocaleTimeString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })} น.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSaving(saving._id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="ลบรายการ"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-green-600">🎯</span> บันทึกรายการ
            </h2>
            <SavingForm studentId={studentId} />

            {selectedStudent.notes && (
              <div className="card mt-6 bg-yellow-50 border border-yellow-100 text-yellow-800">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>💡</span> หมายเหตุ
                </h3>
                <p className="text-sm italic leading-relaxed">"{selectedStudent.notes}"</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                onClick={handleDeleteStudent}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-red-600 bg-red-50 hover:bg-red-100 border border-red-200"
              >
                <span>🗑️</span> ลบชื่อนักเรียนนี้
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
