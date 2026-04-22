import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function StudentForm({ roomId, studentId, initialData, onClose }) {
  const { createStudent, updateStudent, loading } = useApp();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    studentNumber: initialData?.studentNumber || '',
    age: initialData?.age || '',
    notes: initialData?.notes || '',
  });
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setLocalError('กรุณาระบุชื่อนักเรียน');
      return;
    }

    try {
      const studentData = {
        name: formData.name.trim(),
        studentNumber: formData.studentNumber ? parseInt(formData.studentNumber) : undefined,
        age: formData.age ? parseInt(formData.age) : 0,
        notes: formData.notes.trim(),
      };

      if (studentId) {
        updateStudent(studentId, studentData);
        setSuccess('บันทึกการแก้ไขสำเร็จ!');
      } else {
        createStudent({ ...studentData, roomId });
        setSuccess('เพิ่มนักเรียนสำเร็จ!');
        setFormData({ name: '', studentNumber: '', age: '', notes: '' });
      }
      setTimeout(() => {
        setSuccess('');
        onClose && onClose();
      }, 1500);
    } catch (err) {
      setLocalError(err || 'เพิ่มนักเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="card bg-gradient-to-br from-green-50 to-white border border-green-100 sticky top-24">
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <h2 className="text-base md:text-lg font-bold text-gray-900">📝 {studentId ? 'แก้ไขข้อมูลนักเรียน' : 'เพิ่มนักเรียน'}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      {localError && (
        <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-red-50 text-red-700 rounded-lg md:rounded-xl text-xs md:text-sm font-medium border border-red-100 animate-in fade-in zoom-in duration-200">
          ⚠️ {localError}
        </div>
      )}

      {success && (
        <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-green-50 text-green-700 rounded-lg md:rounded-xl text-xs md:text-sm font-medium border border-green-100 animate-in fade-in zoom-in duration-200">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="col-span-1">
            <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">เลขที่</label>
            <input
              type="number"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              placeholder="1"
              min="1"
              className="form-input rounded-lg md:rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all text-sm"
              disabled={loading}
            />
          </div>
          <div className="col-span-2">
            <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">ชื่อ-นามสกุล *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="สมชาย ใจดี"
              className="form-input rounded-lg md:rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all text-sm"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">อายุ (ไม่บังคับ)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="9"
            min="0"
            max="18"
            className="form-input rounded-lg md:rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all text-sm"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">หมายเหตุ</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="เช่น เบอร์โทรผู้ปกครอง หรือข้อมูลเพิ่มเติม"
            rows="2"
            className="form-input rounded-lg md:rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all text-sm"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-1 md:pt-2">
          <button
            type="submit"
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg md:rounded-lg transition-colors duration-200 disabled:opacity-50 text-sm md:text-base"
            disabled={loading}
          >
            {loading ? 'กำลังบันทึก...' : (studentId ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล')}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-3 md:px-4 py-2.5 md:py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg md:rounded-lg transition-colors duration-200 text-sm md:text-base"
              disabled={loading}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
