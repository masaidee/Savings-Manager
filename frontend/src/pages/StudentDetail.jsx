import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import SavingForm from '../components/SavingForm';

export default function StudentDetail({ studentId, onBack }) {
  const { loadStudentDetails, selectedStudent, savings, deleteSaving, deleteStudent } = useApp();

  useEffect(() => {
    loadStudentDetails(studentId);
  }, [studentId]);

  if (!selectedStudent) {
    return <div className="text-center py-8">Loading...</div>;
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
        deleteStudent(studentId);
        onBack();
      } catch (error) {
        alert('ลบนักเรียนไม่สำเร็จ: ' + error);
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
            ← กลับห้องเรียน
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            {selectedStudent.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            {selectedStudent.age > 0 && (
              <span className="text-gray-600 text-lg">อายุ: {selectedStudent.age} ปี</span>
            )}
            <span className="badge badge-blue">
              🏫 {selectedStudent.roomName}
            </span>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 text-center">
          <p className="text-gray-600 text-sm">ยอดเงินคงเหลือ</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {selectedStudent.balance.toFixed(2)} ฿
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">ประวัติการออม</h2>

            {savings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                ยังไม่มีรายการ
              </p>
            ) : (
              <div className="space-y-3">
                {savings.map((saving) => (
                  <div
                    key={saving._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`badge ${
                            saving.type === 'deposit'
                              ? 'badge-green'
                              : 'badge-red'
                          }`}
                        >
                          {saving.type === 'deposit' ? '💰 ฝาก' : '💸 ถอน'}
                        </span>
                        <span className="font-medium">
                          {saving.amount.toFixed(2)} ฿
                        </span>
                      </div>
                      {saving.notes && (
                        <p className="text-sm text-gray-600">
                          {saving.notes}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(saving.date).toLocaleDateString('th-TH')} เวลา{' '}
                        {new Date(saving.date).toLocaleTimeString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSaving(saving._id)}
                      className="ml-4 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      ลบ
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">บันทึกรายการ</h2>
            <SavingForm studentId={studentId} />
          </div>

          {selectedStudent.notes && (
            <div className="card">
              <h3 className="font-semibold mb-2">หมายเหตุ</h3>
              <p className="text-gray-700">{selectedStudent.notes}</p>
            </div>
          )}

          <button
            onClick={handleDeleteStudent}
            className="w-full py-2 rounded-lg font-medium transition-colors text-white bg-red-600 hover:bg-red-700"
          >
            🗑️ ลบนักเรียนนี้
          </button>
        </div>
      </div>
    </div>
  );
}
